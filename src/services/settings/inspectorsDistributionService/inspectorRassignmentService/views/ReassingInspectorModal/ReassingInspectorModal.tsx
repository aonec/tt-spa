import React, { FC } from 'react';
import {
  ReassingInspectorForm,
  ReassingInspectorModalProps,
} from './ReassingInspectorModal.types';
import { FormWrap, ModalDescription } from './ReassingInspectorModal.styled';
import { Form } from 'antd';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Select } from 'ui-kit/Select';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { useFormik } from 'formik';
import * as yup from 'yup';

export const ReassingInspectorModal: FC<ReassingInspectorModalProps> = ({
  isOpen,
  handleClose,
  handleSave,
  inspectorsList,
  isLoading,
}) => {
  const inspectorsOptionsList = inspectorsList?.map((inspector) => (
    <Select.Option key={inspector.id} value={inspector.id}>
      {inspector.fullName}
    </Select.Option>
  ));

  const { values, submitForm, setFieldValue, errors } =
    useFormik<ReassingInspectorForm>({
      initialValues: {
        currentInspector: null,
        newInspector: null,
      },
      validationSchema: yup.object().shape({
        currentInspector: yup
          .number()
          .nullable()
          .required('Это поле обязательно'),
        newInspector: yup.number().nullable().required('Это поле обязательно'),
      }),
      validateOnChange:false,
      onSubmit: (data) => handleSave(data),
    });

  return (
    <FormModal
      formId="reassing-inspector-modal"
      title="Переназначить сотрудника"
      visible={isOpen}
      onCancel={handleClose}
      onSubmit={submitForm}
      submitBtnText="Переназначить сотрудника"
      loading={isLoading}
      form={
        <>
          <ModalDescription>
            На все адреса такущего сотрудника будет автоматически назначен новый
            сотрудник
          </ModalDescription>
          <FormWrap>
            <Form.Item label="Текущий сотрудник">
              <Select
                allowClear
                value={values.currentInspector || undefined}
                onChange={(value) =>
                  setFieldValue('currentInspector', Number(value) || null)
                }
                placeholder="Выберите из списка"
              >
                {inspectorsOptionsList}
              </Select>
              <ErrorMessage>{errors.currentInspector}</ErrorMessage>
            </Form.Item>
            <Form.Item label="Новый сотрудник">
              <Select
                allowClear
                value={values.newInspector || undefined}
                onChange={(value) =>
                  setFieldValue('newInspector', Number(value) || null)
                }
                placeholder="Выберите из списка"
              >
                {inspectorsOptionsList}
              </Select>
              <ErrorMessage>{errors.newInspector}</ErrorMessage>
            </Form.Item>
          </FormWrap>
        </>
      }
    />
  );
};
