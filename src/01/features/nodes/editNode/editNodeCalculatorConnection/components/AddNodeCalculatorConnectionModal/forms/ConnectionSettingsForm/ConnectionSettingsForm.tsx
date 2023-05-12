import { Switch } from 'antd';
import { useForm } from 'effector-forms/dist';
import React, { FC } from 'react';
import { Flex } from '../../../../../../../../shared/ui/Layout/Flex';
import { Space } from '../../../../../../../../shared/ui/Layout/Space/Space';
import { addNodeCalculatorService } from '../../AddNodeCalculatorConnectionModal.models';
import { Input } from 'ui-kit/Input';
import { FormItem } from 'ui-kit/FormItem';
import { Wrapper } from './ConnectionSettingsForm.styled';
import { ConnectionSettingsFormProps } from './ConnectionSettingsForm.types';
import { Form } from 'antd';

export const ConnectionSettingsForm: FC<ConnectionSettingsFormProps> = ({
  formId,
}) => {
  const { fields } = useForm(
    addNodeCalculatorService.inputs.connectionSettingsForm,
  );

  return (
    <Form id={formId}>
      <Wrapper>
        <Flex>
          <Switch
            defaultChecked
            checked={fields.isConnected.value}
            onChange={fields.isConnected.onChange as any}
          />
          <Space />
          <div style={{ fontSize: 18, fontWeight: 400 }}>
            Опрашивать вычислитель
          </div>
        </Flex>
        <div></div>
        <FormItem label="IP адрес вычислителя">
          <Input
            value={fields.ipV4.value}
            onChange={(e: any) => fields.ipV4.onChange(e.target.value)}
            disabled={!fields.isConnected.value}
            placeholder="Введите IP адрес вычислителя"
          />
        </FormItem>
        <FormItem label="Порт">
          <Input
            type="number"
            value={fields.port.value}
            onChange={(e: any) => fields.port.onChange(e.target.value)}
            disabled={!fields.isConnected.value}
            placeholder="Введите номер порта"
          />
        </FormItem>
      </Wrapper>
      <FormItem label="Сетевой адрес вычислителя">
        <Input
          type="number"
          value={fields.deviceAddress.value}
          onChange={(e: any) => fields.deviceAddress.onChange(e.target.value)}
          disabled={!fields.isConnected.value}
          placeholder="Введите сетевой адрес вычислителя "
        />
      </FormItem>
    </Form>
  );
};
