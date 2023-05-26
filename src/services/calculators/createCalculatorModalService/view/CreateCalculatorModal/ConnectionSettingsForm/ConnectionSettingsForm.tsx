import { Switch } from 'antd';
import React, { FC, useEffect } from 'react';
import { Input } from 'ui-kit/Input';
import { FormItem } from 'ui-kit/FormItem';
import {
  IsConnectedText,
  SwitchWrapper,
  Wrapper,
} from './ConnectionSettingsForm.styled';
import { ConnectionSettingsFormProps } from './ConnectionSettingsForm.types';
import { Form } from 'antd';
import { useFormik } from 'formik';

export const ConnectionSettingsForm: FC<ConnectionSettingsFormProps> = ({
  formId,
  initialValues,
  updatePayload,
}) => {
  const { values, setFieldValue, submitForm } = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: updatePayload,
  });

  useEffect(() => {
    if (!values.isConnected) {
      setFieldValue('connection', undefined);
    }
  }, [values, setFieldValue]);

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <SwitchWrapper>
        <Switch
          checked={values.isConnected}
          onChange={(isConnected) => setFieldValue('isConnected', isConnected)}
        />
        <IsConnectedText>Опрашивать вычислитель</IsConnectedText>
      </SwitchWrapper>
      <Wrapper>
        <FormItem label="IP адрес вычислителя">
          <Input
            value={values.connection?.ipV4 || undefined}
            onChange={(e) => setFieldValue('connection.ipV4', e.target.value)}
            disabled={!values.isConnected}
            placeholder="Введите IP адрес вычислителя"
          />
        </FormItem>
        <FormItem label="Порт">
          <Input
            type="number"
            value={values.connection?.port || undefined}
            onChange={(e) =>
              setFieldValue('connection.port', Number(e.target.value))
            }
            disabled={!values.isConnected}
            placeholder="Введите номер порта"
          />
        </FormItem>
      </Wrapper>
      <FormItem label="Сетевой адрес вычислителя">
        <Input
          type="number"
          value={values.connection?.deviceAddress || undefined}
          onChange={(e) =>
            setFieldValue('connection.deviceAddress', Number(e.target.value))
          }
          disabled={!values.isConnected}
          placeholder="Введите сетевой адрес вычислителя "
        />
      </FormItem>
    </Form>
  );
};
