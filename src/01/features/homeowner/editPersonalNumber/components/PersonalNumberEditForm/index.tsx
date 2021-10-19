import React from 'react';
import styled from 'styled-components';
import { Form, Switch } from 'antd';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { Grid } from '01/shared/ui/Layout/Grid';
import { InputTT } from '01/tt-components';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Trash } from 'react-bootstrap-icons';
import { useForm } from 'effector-forms/dist';
import {
  openCloseHomeonwerAccountModal,
  personalNumberEditForm,
  PersonalNumberFormGate,
} from '../../models';
import { ChangeEvent } from 'react-router/node_modules/@types/react';
import confirm from 'antd/lib/modal/confirm';
import { useHistory, useParams } from 'react-router';
import axios from '01/axios';

interface Props {
  type?: 'switch' | 'edit';
}

export const PersonalNumberEditForm: React.FC<Props> = ({ type }) => {
  const { fields } = useForm(personalNumberEditForm);
  const history = useHistory();
  const isEdit = type === 'edit';

  const { homeownerId } = useParams<{ homeownerId: string }>();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    (fields as any)[e.target.name]?.onChange(e.target.value);

  return (
    <Wrap>
      <PersonalNumberFormGate />
      <Form.Item label="Дата открытия лицевого счета">
        <DatePickerNative
          value={fields.openAt.value}
          onChange={fields.openAt.onChange}
        />
      </Form.Item>
      <Grid temp="3fr 1fr" gap="15px">
        <Form.Item label="Лицевой счет">
          <InputTT
            placeholder="Введите л/с"
            value={fields.personalAccountNumber.value}
            name="personalAccountNumber"
            onChange={onChangeHandler}
          />
        </Form.Item>
        <Form.Item label="Платежный код">
          <InputTT
            type="number"
            value={fields.paymentCode.value}
            onChange={onChangeHandler}
            name="paymentCode"
          />
        </Form.Item>
      </Grid>
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Собственник">
          <InputTT
            placeholder="Введите ФИО"
            value={fields.name.value}
            onChange={onChangeHandler}
            name="name"
          />
        </Form.Item>
        <Form.Item label="Телефон">
          <InputTT
            placeholder="Введите телефон"
            value={fields.phoneNumber.value}
            onChange={onChangeHandler}
            name="phoneNumber"
          />
        </Form.Item>
      </Grid>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Flex>
          <Switch
            checked={fields.isMainAccountingNumber.value}
            onChange={fields.isMainAccountingNumber.onChange}
          />
          <Space />
          Основной лицевой счет
        </Flex>
        {isEdit && (
          <DeleteButton onClick={() => openCloseHomeonwerAccountModal()}>
            <Trash />
            <Space w={7} />
            Закрыть лицевой счет
          </DeleteButton>
        )}
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
