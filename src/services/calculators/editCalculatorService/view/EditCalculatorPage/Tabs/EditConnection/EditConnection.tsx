import React, { FC } from 'react';
import { SwitchText, Wrapper } from './EditConnection.styled';
import { EditConnectionProps } from './EditConnection.types';
import { FormItem } from 'ui-kit/FormItem';
import { Switch } from 'antd';
import { Input } from 'ui-kit/Input';
import { Footer } from '../EditMainInfo/EditMainInfo.styled';
import { Button } from 'ui-kit/Button';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { EditExistingConnectionErrorModal } from './EditExistingConnectionErrorModal';
import { useForm } from 'effector-forms';

export const EditConnection: FC<EditConnectionProps> = ({
  onCancel,
  sameConnectionCalculator,
  handleCloseModal,
  isModalOpen,
  form,
}) => {
  const { values, submit, fields } = useForm(form);

  return (
    <>
      <EditExistingConnectionErrorModal
        isModalOpen={isModalOpen}
        sameConnectionCalculator={sameConnectionCalculator}
        handleCloseModal={handleCloseModal}
      />

      <Wrapper>
        <FormItem>
          <Switch
            style={{ width: '48px' }}
            checked={values.isConnected || undefined}
            onChange={(value) => {
              fields.isConnected.onChange(value);
            }}
          />
          <SwitchText>Опрашивать вычислитель</SwitchText>
        </FormItem>

        <FormItem label="IP адрес вычислителя">
          <Input
            placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
            type="text"
            value={values.ipV4 || undefined}
            onChange={(value) => {
              fields.ipV4.onChange(value.target.value);
            }}
          />
          <ErrorMessage>{fields.ipV4.errorText()}</ErrorMessage>
        </FormItem>

        <FormItem label="Порт">
          <Input
            type="number"
            placeholder="Укажите порт устройства (например, 1234)"
            value={values.port || undefined}
            onChange={(value) => {
              fields.port.onChange(value.target.value);
            }}
          />
          <ErrorMessage>{fields.port.errorText()}</ErrorMessage>
        </FormItem>

        <FormItem label="Адрес прибора">
          <Input
            type="number"
            placeholder="Укажите адреса устройства"
            value={values.deviceAddress || undefined}
            onChange={(value) => {
              fields.deviceAddress.onChange(value.target.value);
            }}
          />
          <ErrorMessage>{fields.deviceAddress.errorText()}</ErrorMessage>
        </FormItem>

        <Footer>
          <Button type="ghost" onClick={onCancel}>
            Отмена
          </Button>
          <Button onClick={() => submit()}>Сохранить</Button>
        </Footer>
      </Wrapper>
    </>
  );
};
