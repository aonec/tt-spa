import { Form } from 'antd';
import { useForm } from 'effector-forms';
import React, { FC } from 'react';
import { FormWrap } from './components';
import { InspectorAddressesResetModalProps } from './types';
import { Select } from 'ui-kit/Select';
import { FormModal } from 'ui-kit/Modals/FormModal';

export const InspectorAddressesResetModal: FC<
  InspectorAddressesResetModalProps
> = ({
  isOpen,
  handleClose,
  handleResetAddress,
  form,
  loading,
  inspectorsList,
}) => {
  const { fields } = useForm(form);
  return (
    <FormModal
      formId="inspector-addresses-reset-modal"
      title="Сбросить все адреса"
      submitBtnText="Сбросить все адреса"
      visible={isOpen}
      onCancel={handleClose}
      onSubmit={handleResetAddress}
      loading={loading}
      form={
        <FormWrap>
          <Form.Item label="Сотрудник">
            <Select
              allowClear
              placeholder="Выберите из списка"
              value={fields.inspectorId.value || undefined}
              onChange={(value) =>
                fields.inspectorId.onChange(Number(value) || null)
              }
            >
              {inspectorsList?.map((elem) => (
                <Select.Option key={elem.id} value={elem.id}>
                  {elem.fullName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </FormWrap>
      }
    />
  );
};
