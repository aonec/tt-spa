import { ModalTT } from '01/shared/ui/ModalTT';
import React, { FC } from 'react';
import { ReassingInspectorModalProps } from './ReassingInspectorModal.types';
import { FormWrap, ModalDescription } from './ReassingInspectorModal.styled';
import { useForm } from 'effector-forms/dist';
import { Form } from 'antd';
import { Select } from '01/shared/ui/Select';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
export const ReassingInspectorModal: FC<ReassingInspectorModalProps> = ({
  isOpen,
  handleClose,
  handleSave,
  form,
  inspectorsList,
  isLoading,
}) => {
  const { fields } = useForm(form);

  const inspectorsOptionsList = inspectorsList?.map((inspector) => (
    <Select.Option key={inspector.id} value={inspector.id}>
      {inspector.fullName}
    </Select.Option>
  ));

  return (
    <ModalTT
      title="Переназначить сотрудника"
      visible={isOpen}
      onCancel={handleClose}
      onSubmit={handleSave}
      saveBtnText="Переназначить сотрудника"
      loading={isLoading}
    >
      <ModalDescription>
        На все адреса такущего сотрудника будет автоматически назначен новый
        сотрудник
      </ModalDescription>
      <FormWrap>
        <Form.Item label="Текущий сотрудник">
          <Select
            allowClear
            value={fields.currentInspector.value || undefined}
            onChange={(value) =>
              fields.currentInspector.onChange(Number(value) || null)
            }
            placeholder="Выберите из списка"
          >
            {inspectorsOptionsList}
          </Select>
          <ErrorMessage>
            {fields.currentInspector.errorText({
              required: 'Это обязательное поле',
            })}
          </ErrorMessage>
        </Form.Item>
        <Form.Item label="Новый сотрудник">
          <Select
            allowClear
            value={fields.newInspector.value || undefined}
            onChange={(value) =>
              fields.newInspector.onChange(Number(value) || null)
            }
            placeholder="Выберите из списка"
          >
            {inspectorsOptionsList}
          </Select>
          <ErrorMessage>
            {fields.newInspector.errorText({
              required: 'Это обязательное поле',
            })}
          </ErrorMessage>
        </Form.Item>
      </FormWrap>
    </ModalTT>
  );
};
