import React from 'react';
import styled from 'styled-components';
import { Form, Switch } from 'antd';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { Grid } from '01/shared/ui/Layout/Grid';
import { InputTT } from '01/tt-components';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Trash } from 'react-bootstrap-icons';

interface HomeownerForm {
  name: string;
  phone: number;
  openAt: string;
  personalAccountNumber: string;
}

export const PersonalNumberEditForm: React.FC = () => {
  return (
    <Wrap>
      <Form.Item label="Дата открытия лицевого счета">
        <DatePickerNative value={null} />
      </Form.Item>
      <Grid temp="3fr 1fr" gap="15px">
        <Form.Item label="Лицевой счет">
          <InputTT placeholder="Введите л/с" />
        </Form.Item>
        <Form.Item label="Платежный код">
          <InputTT type="number" />
        </Form.Item>
      </Grid>
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Собственник">
          <InputTT placeholder="Введите ФИО" />
        </Form.Item>
        <Form.Item label="Телефон">
          <InputTT placeholder="Введите телефон" />
        </Form.Item>
      </Grid>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Flex>
          <Switch />
          <Space />
          Основной лицевой счет
        </Flex>
        <DeleteButton>
          <Trash />
          <Space w={7} />
          Закрыть лицевой счет
        </DeleteButton>
      </Flex>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-bottom: 20px;
`;

const DeleteButton = styled(Flex)`
  align-items: center;
  cursor: pointer;
  color: #a1a1a1;
  transition: 0.2s;
  user-select: none;

  &:hover {
    color: red;
  }
`;
