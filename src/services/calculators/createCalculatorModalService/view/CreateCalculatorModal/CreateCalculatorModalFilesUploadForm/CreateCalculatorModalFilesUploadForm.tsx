import React, { FC } from 'react';
import { EDocumentType } from 'myApi';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { useFormik } from 'formik';
import {
  CreateCalculatorFiles,
  CreateCalculatorModalFilesUploadFormProps,
} from './CreateCalculatorModalFilesUploadForm.types';
import { DocumentsInputWrapper } from './CreateCalculatorModalFilesUploadForm.styled';
import { Form } from 'antd';

export const CreateCalculatorModalFilesUploadForm: FC<
  CreateCalculatorModalFilesUploadFormProps
> = ({ formId, initialValues, updatePayload }) => {
  const { values, setFieldValue, submitForm } =
    useFormik<CreateCalculatorFiles>({
      initialValues,
      onSubmit: updatePayload,
    });

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <DocumentsInputWrapper>
        <DocumentsUploadContainer
          label="Добавьте акт выполненных работ"
          uniqId="one"
          max={1}
          documents={values.deviceAcceptanceAct && [values.deviceAcceptanceAct]}
          onChange={(documents) =>
            setFieldValue('deviceAcceptanceAct', documents[0])
          }
          type={EDocumentType.DeviceAcceptanceAct}
        />
        <DocumentsUploadContainer
          uniqId="two"
          label="Добавьте паспорт прибора"
          max={1}
          documents={values.devicePassport && [values.devicePassport]}
          onChange={(documents) =>
            setFieldValue('devicePassport', documents[0])
          }
          type={EDocumentType.DevicePassport}
        />
        <DocumentsUploadContainer
          uniqId="three"
          label="Добавьте свидетельство о поверке прибора"
          max={1}
          documents={
            values.deviceTestCertificates && [values.deviceTestCertificates]
          }
          onChange={(documents) =>
            setFieldValue('deviceTestCertificates', documents[0])
          }
          type={EDocumentType.DeviceTestCertificates}
        />
      </DocumentsInputWrapper>
    </Form>
  );
};
