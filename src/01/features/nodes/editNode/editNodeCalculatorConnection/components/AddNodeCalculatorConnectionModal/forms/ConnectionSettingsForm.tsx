import { Form, Switch } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../../../../../../shared/ui/Layout/Flex';
import { Grid } from '../../../../../../../shared/ui/Layout/Grid';
import { Space } from '../../../../../../../shared/ui/Layout/Space/Space';
import { InputTT } from '../../../../../../../tt-components';

export const ConnectionSettingsForm = () => {
  return (
    <div>
      <Wrap temp="1fr 1fr" gap="15px">
        <Flex>
          <Switch defaultChecked />
          <Space />
          <div style={{ fontSize: 18, fontWeight: 400 }}>
            Опрашивать вычислитель
          </div>
        </Flex>
        <div></div>
        <Form.Item label="IP адрес вычислителя">
          <InputTT placeholder="Введите IP адрес вычислителя" />
        </Form.Item>
        <Form.Item label="Порт">
          <InputTT placeholder="Введите номер порта" />
        </Form.Item>
      </Wrap>
      <Form.Item label="Сетевой адрес вычислителя">
        <InputTT placeholder="Введите сетевой адрес вычислителя " />
      </Form.Item>
    </div>
  );
};

const Wrap = styled(Grid)``;
