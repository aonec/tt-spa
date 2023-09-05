import React, { FC, useMemo } from 'react';
import { Footer, GridContainer, Wrapper } from './EditMainInfo.styled';
import { EditMainInfoProps } from './EditMainInfo.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { DatePicker } from 'ui-kit/DatePicker';
import { Button } from 'ui-kit/Button';
import moment from 'moment';
import { NodesInfo } from './NodesInfo';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { useForm } from 'effector-forms';

export const EditMainInfo: FC<EditMainInfoProps> = ({
  calculator,
  onCancel,
  calculatorTypesSelectItems,
  form,
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

  const { values, fields, submit } = useForm(form);

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
            fields.serialNumber.onChange(value.target.value);
          }}
        />
        <ErrorMessage>{fields.serialNumber.errorText()}</ErrorMessage>
      </FormItem>

      <GridContainer>
        <FormItem label="Дата поверки прибора">
          <DatePicker
            allowClear={false}
            onChange={(date) => {
              fields.lastCheckingDate.onChange(
                moment(date).format('YYYY-MM-DDTHH:mm:ss'),
              );
              fields.futureCheckingDate.onChange(
                moment(date).add(4, 'years').format('YYYY-MM-DDTHH:mm:ss'),
              );
            }}
            value={
              values.lastCheckingDate
                ? moment(values.lastCheckingDate)
                : undefined
            }
            format="DD.MM.YYYY"
          />
          <ErrorMessage>{fields.lastCheckingDate.errorText()}</ErrorMessage>
        </FormItem>
        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            allowClear={false}
            onChange={(date) => {
              fields.futureCheckingDate.onChange(
                moment(date).format('YYYY-MM-DDTHH:mm:ss'),
              );
            }}
            value={
              values.futureCheckingDate
                ? moment(values.futureCheckingDate)
                : undefined
            }
            format="DD.MM.YYYY"
          />
          <ErrorMessage>{fields.futureCheckingDate.errorText()}</ErrorMessage>
        </FormItem>
      </GridContainer>

      {nodesTinyData?.length ? (
        <NodesInfo nodesTinyData={nodesTinyData} />
      ) : null}

      <Footer>
        <Button type="ghost" onClick={onCancel}>
          Отмена
        </Button>
        <Button onClick={() => submit()}>Сохранить</Button>
      </Footer>
    </Wrapper>
  );
};
