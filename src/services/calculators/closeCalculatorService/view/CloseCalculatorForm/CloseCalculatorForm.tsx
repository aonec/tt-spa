import { Form } from 'antd';
import { useFormik } from 'formik';
import dayjs from 'api/dayjs';
import React, { FC, useState } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { FormItem } from 'ui-kit/FormItem';
import { CloseCalculatorFormik } from '../../closeCalculatorService.types';
import { MessageWrapper } from './CloseCalculatorForm.styled';
import { CloseCalculatorFormProps } from './CloseCalculatorForm.types';
import * as yup from 'yup';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { EDocumentType } from 'api/types';

export const CloseCalculatorForm: FC<CloseCalculatorFormProps> = ({
  formId,
  handleSubmit,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const { submitForm, setFieldValue, values, errors } =
    useFormik<CloseCalculatorFormik>({
      initialValues: {
        closingDate: dayjs().format(),
        documentsIds: [],
      },
      validationSchema: yup.object().shape({
        closingDate: yup.string().required('Это поле обязательно'),
      }),
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: handleSubmit,
    });

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <MessageWrapper>
        После этого прибор перейдет в архив и показания по нему перестанут
        учитываться
      </MessageWrapper>
      <FormItem label="Дата снятия прибора с учета">
        <DatePicker
          value={dayjs(values.closingDate)}
          onChange={(date) => {
            if (!date) {
              return;
            }
            setFieldValue('closingDate', date.format());
          }}
          format={{ format: 'DD.MM.YYYY', type: 'mask' }}
        />
        <ErrorMessage>{errors.closingDate}</ErrorMessage>
      </FormItem>
      <DocumentsUploadContainer
        documents={documents}
        uniqId={formId}
        onChange={(files) => {
          setDocuments(files);
          if (files.length === 0) {
            return setFieldValue('documentsIds', []);
          }
          setFieldValue('documentsIds', [files[0]?.id]);
        }}
        max={1}
        type={EDocumentType.DeviceClosingAct}
      />
    </Form>
  );
};
