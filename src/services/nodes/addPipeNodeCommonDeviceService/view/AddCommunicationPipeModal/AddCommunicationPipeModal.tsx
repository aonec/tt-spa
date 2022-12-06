import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form } from 'antd';
import { useFormik } from 'formik';
import { EMagistralType } from 'myApi';
import React, { FC } from 'react';
import { MagistralsDisctionary } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/meteringDevicesService/view/MeteringDevicesListModal/MeteringDeviceListItem/MeteringDeviceListItem.constants';
import { FormItem } from 'ui-kit/FormItem';
import { Input, InputWithAddon } from 'ui-kit/Input';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Select } from 'ui-kit/Select';
import { validationSchema } from './AddCommunicationPipeModal.constants';
import { LineWrapper } from './AddCommunicationPipeModal.styled';
import { AddCommunicationPipeModalProps } from './AddCommunicationPipeModal.types';

const formId = 'add-communication-pipe-modal';

export const AddCommunicationPipeModal: FC<AddCommunicationPipeModalProps> = ({
  isOpen,
  closeAddPipeModal,
}) => {
  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      number: '',
      diameter: '',
      magistral: null as null | EMagistralType,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: false,
    validationSchema,
  });

  return (
    <FormModal
      title="Добавление трубы"
      visible={isOpen}
      formId={formId}
      onCancel={closeAddPipeModal}
      innerModalProps={{
        width: 700,
      }}
      form={
        <Form id={formId} onSubmitCapture={handleSubmit}>
          <LineWrapper>
            <FormItem label="Номер">
              <Input
                type="number"
                placeholder="Введите"
                name="number"
                value={values.number}
                onChange={handleChange}
              />
              <ErrorMessage>{errors.number}</ErrorMessage>
            </FormItem>
            <FormItem label="Диаметр">
              <InputWithAddon
                type="number"
                placeholder="Введите"
                name="diameter"
                value={values.diameter}
                onChange={handleChange}
                addonAfter="мм"
              />
              <ErrorMessage>{errors.diameter}</ErrorMessage>
            </FormItem>
            <FormItem label="Магистраль">
              <Select
                placeholder="Введите"
                value={values.magistral || undefined}
                onChange={(value) => setFieldValue('magistral', value)}
              >
                {Object.values(EMagistralType).map((magistral) => (
                  <Select.Option key={magistral} value={magistral}>
                    {MagistralsDisctionary[magistral]}
                  </Select.Option>
                ))}
              </Select>
              <ErrorMessage>{errors.magistral}</ErrorMessage>
            </FormItem>
          </LineWrapper>
        </Form>
      }
    />
  );
};
