import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import React, { FC } from 'react';
import styled from 'styled-components';
import { DatePickerNative } from '../../../../../../../shared/ui/DatePickerNative';
import { Grid } from '../../../../../../../shared/ui/Layout/Grid';
import InputTT from '../../../../../../../tt-components/InputTT';
import { SelectItem } from '../../../../../../../tt-components/localBases';
import { StyledSelect } from '../../../../../../../_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { createCalcuatorService } from '../CreateCalculatorModal/models';

interface Props {
  calculatorTypes: SelectItem[];
}

export const BaseInfoAddNodeCalculatorConnectionForm: FC<Props> = ({
  calculatorTypes,
}) => {
  const { fields } = useForm(createCalcuatorService.forms.baseInfo);

  return (
    <Wrap>
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Серийный номер">
          <InputTT
            value={fields.serialNumber.value}
            onChange={(e: any) =>
              fields.serialNumber.onChange(e.target.value) as any
            }
            placeholder="Введите серийный номер вычислителя"
          />
        </Form.Item>
        <Form.Item label="Тип вычислителя">
          <StyledSelect
            placeholder="Выберите тип вычислителя из списка"
            value={fields.infoId.value as any}
            onChange={fields.infoId.onChange as any}
          >
            {calculatorTypes.map((elem) => (
              <StyledSelect.Option key={elem.id} value={elem.id}>
                {elem.label}
              </StyledSelect.Option>
            ))}
          </StyledSelect>
        </Form.Item>
        <Form.Item label="Дата последней поверки прибора">
          <DatePickerNative
            value={fields.lastCheckingDate.value}
            onChange={fields.lastCheckingDate.onChange}
          />
        </Form.Item>
        <Form.Item label="Дата следующей поверки прибора">
          <DatePickerNative
            value={fields.futureCheckingDate.value}
            onChange={fields.futureCheckingDate.onChange}
          />
        </Form.Item>
      </Grid>
    </Wrap>
  );
};

const Wrap = styled.div``;
