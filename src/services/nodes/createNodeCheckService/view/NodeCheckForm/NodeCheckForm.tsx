import React, { FC, useEffect, useState } from 'react';
import { Wrapper } from './NodeCheckForm.styled';
import { NodeCheckFormProps } from './NodeCheckForm.types';
import { Form } from 'antd';
import { useFormik } from 'formik';
import { EDocumentType, UpdateNodeCheckRequest } from 'api/myApi';
import { FormItem } from 'ui-kit/FormItem';
import { DatePicker } from 'ui-kit/DatePicker';
import moment from 'moment';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { CheckingActDocumentType } from '../../../displayNodeChecks/NodeChecks/NodeCheks.constants';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { validationSchema } from './NodeCheckForm.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

export const NodeCheckForm: FC<NodeCheckFormProps> = ({
  handleSubmit,
  formId,
  initialValues,
  isEdit,
}) => {
  const [document, setDocument] = useState<Document | null>(
    initialValues?.checkingAct || null,
  );

  const { values, setFieldValue, submitForm, errors } =
    useFormik<UpdateNodeCheckRequest>({
      initialValues: {
        checkingDate: initialValues?.checkingDate,
        checkType: initialValues?.checkType,
        registryNumber: initialValues?.registryNumber,
      },
      validationSchema: isEdit ? null : validationSchema,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: (values) =>
        handleSubmit({ ...values, documentId: document?.id }),
    });

  useEffect(() => {
    setDocument(initialValues?.checkingAct || null);
  }, [initialValues]);

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <Wrapper>
        <FormItem label="Дата проверки">
          <DatePicker
            format="DD.MM.YYYY"
            onChange={(date) => {
              if (!date) {
                return setFieldValue('checkingDate', date);
              }
              setFieldValue('checkingDate', date?.format('YYYY-MM-DD'));
            }}
            value={values.checkingDate ? moment(values.checkingDate) : null}
          />
          <ErrorMessage>{errors.checkingDate}</ErrorMessage>
        </FormItem>
        <FormItem label="Тип проверки">
          <Select
            placeholder="Выберите тип проверки"
            value={values.checkType || undefined}
            onChange={(type) => setFieldValue('checkType', type)}
          >
            {Object.entries(CheckingActDocumentType).map(([key, value]) => (
              <Select.Option value={key} key={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.checkType}</ErrorMessage>
        </FormItem>
        <FormItem label="Номер документа">
          <Input
            value={values.registryNumber || undefined}
            onChange={(e) =>
              setFieldValue('registryNumber', e.currentTarget.value)
            }
            placeholder="Введите номер"
          />
          <ErrorMessage>{errors.registryNumber}</ErrorMessage>
        </FormItem>
      </Wrapper>
      <DocumentsUploadContainer
        label="Добавьте заключение проверки"
        uniqId="check-apartments"
        documents={document ? [document] : []}
        onChange={(value) => {
          setDocument(value[0]);
        }}
        max={1}
        type={EDocumentType.DeviceCheckAct}
      />
    </Form>
  );
};
