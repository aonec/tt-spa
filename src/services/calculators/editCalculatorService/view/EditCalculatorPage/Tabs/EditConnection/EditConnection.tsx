import React, { FC } from 'react';
import { SwitchText, Wrapper } from './EditConnection.styled';
import { EditConnectionProps } from './EditConnection.types';
import { FormItem } from 'ui-kit/FormItem';
import { Switch } from 'antd';
import { Input } from 'ui-kit/Input';
import { useFormik } from 'formik';
import { MeteringDeviceConnection, UpdateCalculatorRequest } from 'myApi';
import * as yup from 'yup';
import { Footer } from '../EditMainInfo/EditMainInfo.styled';
import { Button } from 'ui-kit/Button';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { EditExistingConnectionErrorModal } from './EditExistingConnectionErrorModal';

export const EditConnection: FC<EditConnectionProps> = ({
  calculator,
  onCancel,
  onSubmit,
  sameConnectionCalculator,
  handleCloseModal,
  isModalOpen,
  clearCalculatorStore,
}) => {
  const connection = calculator?.connection;

  const {
    values,
    setFieldValue,
    errors,
    handleSubmit,
  } = useFormik<UpdateCalculatorRequest>({
    initialValues: {
      connection: {
        ipV4: connection?.ipV4,
        port: connection?.port,
        deviceAddress: connection?.deviceAddress,
      } as MeteringDeviceConnection,
      isConnected: calculator?.isConnected || undefined,
    },
    validationSchema: yup.object().shape({
      connection: yup.object().shape({
        ipV4: yup.string().required('Это поле обязательно'),
        port: yup.number().required('Это поле обязательно'),
        deviceAddress: yup.number().required('Это поле обязательно'),
      }),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  const err = errors.connection;

  console.log(err);

  return (
    <>
      <EditExistingConnectionErrorModal
        isModalOpen={isModalOpen}
        sameConnectionCalculator={sameConnectionCalculator}
        handleCloseModal={handleCloseModal}
        clearCalculatorStore={clearCalculatorStore}
      />

      <Wrapper>
        <FormItem>
          <Switch
            style={{ width: '48px' }}
            checked={values.isConnected}
            onChange={(value) => {
              setFieldValue('isConnected', value);
            }}
          />
          <SwitchText>Опрашивать вычислитель</SwitchText>
        </FormItem>

        <FormItem label="IP адрес вычислителя">
          <Input
            placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
            type="text"
            value={values.connection?.ipV4 || undefined}
            onChange={(value) => {
              setFieldValue('connection', {
                ...values.connection,
                ipV4: value.target.value,
              });
            }}
          />
          <ErrorMessage>{}</ErrorMessage>
        </FormItem>

        <FormItem label="Порт">
          <Input
            type="number"
            placeholder="Укажите порт устройства (например, 1234)"
            value={values.connection?.port || undefined}
            onChange={(value) => {
              setFieldValue('connection', {
                ...values.connection,
                port: Number(value.target.value),
              });
            }}
          />
          <ErrorMessage>{}</ErrorMessage>
        </FormItem>

        <FormItem label="Адрес прибора">
          <Input
            type="number"
            placeholder="Укажите адреса устройства"
            value={values.connection?.deviceAddress || undefined}
            onChange={(value) => {
              setFieldValue('connection', {
                ...values.connection,
                deviceAddress: value.target.value,
              });
            }}
          />
        </FormItem>

        <Footer>
          <Button type="ghost" onClick={onCancel}>
            Отмена
          </Button>
          <Button onClick={() => handleSubmit()}>Сохранить</Button>
        </Footer>
      </Wrapper>
    </>
  );
};
