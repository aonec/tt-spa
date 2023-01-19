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
import { NodesInfo } from './NodesInfo';
import { Button } from 'ui-kit/Button';
import { UpdateCalculatorRequest } from 'myApi';
import moment from 'moment';

export const EditMainInfo: FC<EditMainInfoProps> = ({
  calculator,
  onCancel,
  calculatorTypesSelectItems,
}) => {
  const nodes = calculator?.nodes;
  const nodesTinyData = nodes?.map((node) => ({
    number: node.number,
    id: node.id,
    resource: node.resource,
    entryNumber: node.communicationPipes?.[0].entryNumber || null,
  }));

  const { values, setFieldValue, errors } = useFormik<UpdateCalculatorRequest>({
    initialValues: {
      serialNumber: calculator?.serialNumber,
      infoId: calculator?.infoId,
      lastCheckingDate: calculator?.lastCheckingDate,
      futureCheckingDate: calculator?.futureCheckingDate,
    },
    validationSchema: yup.object().shape({
      currentCheckingDate: yup.string().required('Это поле обязательно'),
      futureCheckingDate: yup.string().required('Это поле обязательно'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: () => {},
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
      </FormItem>

      <GridContainer>
        <FormItem label="Дата поверки прибора">
          <DatePicker
            onChange={(date) => {
              setFieldValue('lastCheckingDate', date);
              setFieldValue('futureCheckingDate', moment(date).add(4, 'years'));
            }}
            value={moment(values.lastCheckingDate)}
            format="DD.MM.YYYY"
          />
          <ErrorMessage>{errors.lastCheckingDate}</ErrorMessage>
        </FormItem>
        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            onChange={(date) => {
              setFieldValue('futureCheckingDate', date);
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
        <Button>Сохранить</Button>
      </Footer>
    </Wrapper>
  );
};
