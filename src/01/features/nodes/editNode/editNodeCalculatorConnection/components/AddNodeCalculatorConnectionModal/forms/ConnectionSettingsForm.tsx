import { Form, Switch } from 'antd';
import { useForm } from 'effector-forms/dist';
import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../../../../../../shared/ui/Layout/Flex';
import { Grid } from '../../../../../../../shared/ui/Layout/Grid';
import { Space } from '../../../../../../../shared/ui/Layout/Space/Space';
import { InputTT } from '../../../../../../../tt-components';
import { addNodeCalculatorService } from '../models';

export const ConnectionSettingsForm = () => {
  const { fields } = useForm(
    addNodeCalculatorService.inputs.connectionSettingsForm
  );

  return (
    <div>
      <Wrap temp="1fr 1fr" gap="15px">
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
        <Form.Item label="IP адрес вычислителя">
          <InputTT
            value={fields.ipV4.value}
            onChange={(e: any) => fields.ipV4.onChange(e.target.value)}
            disabled={!fields.isConnected.value}
            placeholder="Введите IP адрес вычислителя"
          />
        </Form.Item>
        <Form.Item label="Порт">
          <InputTT
            type="number"
            value={fields.port.value}
            onChange={(e: any) => fields.port.onChange(e.target.value)}
            disabled={!fields.isConnected.value}
            placeholder="Введите номер порта"
          />
        </Form.Item>
      </Wrap>
      <Form.Item label="Сетевой адрес вычислителя">
        <InputTT
          type="number"
          value={fields.deviceAddress.value}
          onChange={(e: any) => fields.deviceAddress.onChange(e.target.value)}
          disabled={!fields.isConnected.value}
          placeholder="Введите сетевой адрес вычислителя "
        />
      </Form.Item>
    </div>
  );
};

const Wrap = styled(Grid)``;
