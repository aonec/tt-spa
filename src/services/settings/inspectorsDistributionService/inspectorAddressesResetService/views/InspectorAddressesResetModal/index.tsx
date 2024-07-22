import { Form } from 'antd';
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
  loading,
  inspectorsList,
  handleSelectInspector,
  inspectorId,
}) => {
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
              value={inspectorId || undefined}
              onChange={(value) => handleSelectInspector(Number(value))}
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
