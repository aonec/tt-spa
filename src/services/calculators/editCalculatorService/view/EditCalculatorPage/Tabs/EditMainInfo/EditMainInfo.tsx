import React, { FC, useMemo } from 'react';
import { Footer, GridContainer, Wrapper } from './EditMainInfo.styled';
import { EditMainInfoProps } from './EditMainInfo.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { DatePicker } from 'ui-kit/DatePicker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from 'ui-kit/Button';
import { UpdateCalculatorRequest } from 'api/types';
import dayjs from 'api/dayjs';
import { NodesInfo } from './NodesInfo';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

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

  const currentInfoId = useMemo(
    () =>
      calculatorTypesSelectItems.find(
        (calculatorType) => calculatorType.id === calculator?.infoId,
      )?.id,
    [calculatorTypesSelectItems, calculator],
  );

  const { values, setFieldValue, errors, handleSubmit } =
    useFormik<UpdateCalculatorRequest>({
      initialValues: {
        serialNumber: calculator?.serialNumber,
        lastCheckingDate: calculator?.lastCheckingDate,
        futureCheckingDate: calculator?.futureCheckingDate,
      },
      validationSchema: yup.object().shape({
        serialNumber: yup.string().nullable().required('Это поле обязательно'),
        lastCheckingDate: yup
          .string()
          .nullable()
          .required('Это поле обязательно'),
        futureCheckingDate: yup
          .string()
          .nullable()
          .required('Это поле обязательно'),
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
          value={currentInfoId || undefined}
          disabled
          options={calculatorTypesSelectItems}
        />
      </FormItem>

      <FormItem label="Серийный номер">
        <Input
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
                dayjs(date).format('YYYY-MM-DDTHH:mm:ss'),
              );
              setFieldValue(
                'futureCheckingDate',
                dayjs(date).add(4, 'years').format('YYYY-MM-DDTHH:mm:ss'),
              );
            }}
            value={
              values.lastCheckingDate
                ? dayjs(values.lastCheckingDate)
                : undefined
            }
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
                dayjs(date).format('YYYY-MM-DDTHH:mm:ss'),
              );
            }}
            value={
              values.futureCheckingDate
                ? dayjs(values.futureCheckingDate)
                : undefined
            }
            format="DD.MM.YYYY"
          />
          <ErrorMessage>{errors.futureCheckingDate}</ErrorMessage>
        </FormItem>
      </GridContainer>

      {nodesTinyData?.length ? (
        <NodesInfo nodesTinyData={nodesTinyData} />
      ) : null}

      <Footer>
        <Button type="ghost" onClick={onCancel}>
          Отмена
        </Button>
        <Button onClick={() => handleSubmit()}>Сохранить</Button>
      </Footer>
    </Wrapper>
  );
};
