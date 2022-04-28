import { ModalTT } from '01/shared/ui/ModalTT';
import { Select } from '01/shared/ui/Select';
import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import React, { FC } from 'react';
import { SelectNotify } from 'selects';
import { FormWrap } from './components';
import { InspectorAddressesResetModalProps } from './types';

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
          <SelectNotify
            placeholder="Выберите из списка"
            value={fields.inspectorId.value || undefined}
            onChange={(value: number) =>
              fields.inspectorId.onChange(value || null)
            }
          >
            {inspectorsList?.map((elem) => (
              <Select.Option key={elem.id} value={elem.id}>
                {elem.fullName}
              </Select.Option>
            ))}
          </SelectNotify>
        </Form.Item>
      </FormWrap>
    </ModalTT>
  );
};
