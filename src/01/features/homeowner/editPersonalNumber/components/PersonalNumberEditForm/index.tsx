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
import { useHistory, useParams } from 'react-router';
import { ErrorMessage } from '01/features/contractors/addContractors';

interface Props {
  type?: 'switch' | 'edit' | 'split';
  form?: any;
}

export const PersonalNumberEditForm: React.FC<Props> = ({ type, form }) => {
  const { fields } = useForm(form || personalNumberEditForm);
  const isEdit = type === 'edit';

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
        <ErrorMessage>
          {fields.openAt.errorText({
            required: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </Form.Item>
      <Grid temp="3fr 1fr" gap="15px">
        <Form.Item label="Лицевой счет">
          <InputTT
            placeholder="Введите л/с"
            value={fields.personalAccountNumber.value}
            name="personalAccountNumber"
            onChange={onChangeHandler}
          />
          <ErrorMessage>
            {fields.personalAccountNumber.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
        <Form.Item label="Платежный код">
          <InputTT
            type="number"
            value={fields.paymentCode.value}
            onChange={onChangeHandler}
            name="paymentCode"
          />
          <ErrorMessage>
            {fields.paymentCode.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
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
          <ErrorMessage>
            {fields.name.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
        <Form.Item label="Телефон">
          <InputTT
            placeholder="Введите телефон"
            value={fields.phoneNumber.value}
            onChange={onChangeHandler}
            name="phoneNumber"
          />
          <ErrorMessage>
            {fields.phoneNumber.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
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
