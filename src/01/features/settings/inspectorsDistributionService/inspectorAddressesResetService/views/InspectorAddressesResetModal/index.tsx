import { ModalTT } from '01/shared/ui/ModalTT';
import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import React, { FC } from 'react';
import { FormWrap } from './components';
import { InspectorAddressesResetModalProps } from './types';
import { Select } from '01/shared/ui/Select';

export const InspectorAddressesResetModal: FC<InspectorAddressesResetModalProps> = ({
  isOpen,
  handleClose,
  handleResetAddress,
  form,
  loading,
  inspectorsList,
}) => {
  const { fields } = useForm(form);
  return (
    <ModalTT
      title="Сбросить все адреса"
      saveBtnText="Сбросить все адреса"
      visible={isOpen}
      onCancel={handleClose}
      onSubmit={handleResetAddress}
      loading={loading}
    >
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
    </ModalTT>
  );
};
