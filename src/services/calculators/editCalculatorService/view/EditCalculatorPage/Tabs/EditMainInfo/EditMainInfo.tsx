import React, { FC } from 'react';
import { Footer, GridContainer, Wrapper } from './EditMainInfo.styled';
import { EditMainInfoProps } from './EditMainInfo.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { DatePicker } from 'ui-kit/DatePicker';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from 'ui-kit/Button';
import { UpdateCalculatorRequest } from 'myApi';
import moment from 'moment';
import { NodesInfo } from './NodesInfo';

export const EditMainInfo: FC<EditMainInfoProps> = ({
  calculator,
  onCancel,
  calculatorTypesSelectItems,
  onSubmit,
}) => {
  const nodes = calculator?.nodes;
  const nodesTinyData = nodes?.map((node) => ({
    number: node.number,
    id: node.id,
    resource: node.resource,
    entryNumber: node.communicationPipes?.[0]?.entryNumber || null,
  }));

  const getCurrentInfoId = calculatorTypesSelectItems.find(
    (calculatorType) => calculatorType.id === calculator?.infoId,
  )?.id;

  const { values, setFieldValue, errors, handleSubmit } =
    useFormik<UpdateCalculatorRequest>({
      initialValues: {
        serialNumber: calculator?.serialNumber,
        infoId: getCurrentInfoId,
        lastCheckingDate: calculator?.lastCheckingDate,
        futureCheckingDate: calculator?.futureCheckingDate,
      },
      validationSchema: yup.object().shape({
        serialNumber: yup.string().required('Это поле обязательно'),
        lastCheckingDate: yup.string().required('Это поле обязательно'),
        futureCheckingDate: yup.string().required('Это поле обязательно'),
      }),
      validateOnBlur: false,
      validateOnChange: false,
      enableReinitialize: true,
      onSubmit: (data) => {
        onSubmit(data);
      },
    });

  return (
    <Wrapper>
      <FormItem label="Тип вычислителя">
        <Select
          placeholder="Выберите"
          value={values.infoId || undefined}
          onChange={(value) => {
            setFieldValue('infoId', value);
          }}
          options={calculatorTypesSelectItems}
        />
      </FormItem>

      <FormItem label="Серийный номер">
        <Input
          type="number"
          placeholder="Введите"
          value={values.serialNumber || undefined}
          onChange={(value) => {
            setFieldValue('serialNumber', value.target.value);
          }}
        />
        <ErrorMessage>{errors.serialNumber}</ErrorMessage>
      </FormItem>

      <GridContainer>
        <FormItem label="Дата поверки прибора">
          <DatePicker
            allowClear={false}
            onChange={(date) => {
              setFieldValue(
                'lastCheckingDate',
                moment(date).format('YYYY-MM-DDTHH:mm:ss'),
              );
              setFieldValue(
                'futureCheckingDate',
                moment(date).add(4, 'years').format('YYYY-MM-DDTHH:mm:ss'),
              );
            }}
            value={moment(values.lastCheckingDate)}
            format="DD.MM.YYYY"
          />
          <ErrorMessage>{errors.lastCheckingDate}</ErrorMessage>
        </FormItem>
        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            allowClear={false}
            onChange={(date) => {
              setFieldValue(
                'futureCheckingDate',
                moment(date).format('YYYY-MM-DDTHH:mm:ss'),
              );
            }}
            value={moment(values.futureCheckingDate)}
            format="DD.MM.YYYY"
          />
          <ErrorMessage>{errors.futureCheckingDate}</ErrorMessage>
        </FormItem>
      </GridContainer>

      {nodesTinyData?.length && <NodesInfo nodesTinyData={nodesTinyData} />}

      <Footer>
        <Button type="ghost" onClick={onCancel}>
          Отмена
        </Button>
        <Button onClick={() => handleSubmit()}>Сохранить</Button>
      </Footer>
    </Wrapper>
  );
};
