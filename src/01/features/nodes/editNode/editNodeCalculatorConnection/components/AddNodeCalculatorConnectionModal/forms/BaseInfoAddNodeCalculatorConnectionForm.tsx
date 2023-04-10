import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import React, { FC } from 'react';
import { DatePickerNative } from '../../../../../../../shared/ui/DatePickerNative';
import { Grid } from '../../../../../../../shared/ui/Layout/Grid';
import InputTT from '../../../../../../../tt-components/InputTT';
import { SelectItem } from '../../../../../../../tt-components/localBases';
import { createCalcuatorService } from '../CreateCalculatorModal/models';
import { Select } from 'ui-kit/Select';

interface Props {
  calculatorTypes: SelectItem[];
}

export const BaseInfoAddNodeCalculatorConnectionForm: FC<Props> = ({
  calculatorTypes,
}) => {
  const { fields } = useForm(createCalcuatorService.forms.baseInfo);

  return (
    <div>
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
          <Select
            placeholder="Выберите тип вычислителя из списка"
            value={fields.infoId.value as any}
            onChange={fields.infoId.onChange as any}
          >
            {calculatorTypes.map((elem) => (
              <Select.Option key={elem.id} value={elem.id}>
                {elem.label}
              </Select.Option>
            ))}
          </Select>
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
    </div>
  );
};
