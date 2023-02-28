import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { FormItem } from 'ui-kit/FormItem';
import { CloseCalculatorFormik } from '../../closeCalculatorService.types';
import { MessageWrapper } from './CloseCalculatorForm.styled';
import { CloseCalculatorFormProps } from './CloseCalculatorForm.types';
import * as yup from 'yup';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { EDocumentType } from 'myApi';

export const CloseCalculatorForm: FC<CloseCalculatorFormProps> = ({
  formId,
  handleSubmit,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const { submitForm, setFieldValue, values, errors } =
    useFormik<CloseCalculatorFormik>({
      initialValues: {
        closingDate: moment().format(),
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
          value={moment(values.closingDate)}
          onChange={(date) => {
            if (!date) {
              return;
            }
            setFieldValue('closingDate', date.format());
          }}
          format="DD.MM.YYYY"
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
