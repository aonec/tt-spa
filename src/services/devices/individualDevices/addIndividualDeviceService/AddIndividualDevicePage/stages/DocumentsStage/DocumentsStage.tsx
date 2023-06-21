import React, { FC, useState } from 'react';
import { DocumentStageForm, DocumentsStageProps } from './DocumentsStage.types';
import {
  DocumentsUploadWrapper,
  Footer,
  FormHeader,
} from './DocumentsStage.styled';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { EDocumentType } from 'myApi';
import { Button } from 'ui-kit/Button';
import { useFormik } from 'formik';

export const DocumentsStage: FC<DocumentsStageProps> = ({
  handleGoPrevStage,
  documents,
  handleSubmitDocumentStage,
}) => {
  const { values, setFieldValue, handleSubmit } = useFormik<DocumentStageForm>({
    initialValues: {
      completedWorks: (documents?.completedWorks || null) as Document[] | null,
      devicePassport: (documents?.devicePassport || null) as Document[] | null,
      deviceCheck: (documents?.deviceCheck || null) as Document[] | null,
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (data) => {
      handleSubmitDocumentStage(data);
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading);

  return (
    <>
      <FormHeader>Документы</FormHeader>

      <DocumentsUploadWrapper>
        <DocumentsUploadContainer
          uniqId="create-individual-device-completed-works"
          label="Добавьте акт выполненных работ"
          max={1}
          documents={values.completedWorks}
          onChange={(value) => setFieldValue('completedWorks', value)}
          type={EDocumentType.DeviceAcceptanceAct}
          setIsLoading2={setIsLoading}
        />
        <DocumentsUploadContainer
          uniqId="create-individual-device-passport"
          label="Добавьте паспорт прибора"
          max={1}
          documents={values.devicePassport}
          onChange={(value) => setFieldValue('devicePassport', value)}
          type={EDocumentType.DevicePassport}
          setIsLoading2={setIsLoading}
        />
        <DocumentsUploadContainer
          uniqId="create-individual-device-check"
          label="Добавьте свидетельство о проверке прибора"
          max={1}
          documents={values.deviceCheck}
          onChange={(value) => setFieldValue('deviceCheck', value)}
          type={EDocumentType.DeviceTestCertificates}
          setIsLoading2={setIsLoading}
        />
      </DocumentsUploadWrapper>

      <Footer>
        <Button type="ghost" onClick={handleGoPrevStage}>
          Назад
        </Button>
        <Button disabled={isLoading} onClick={() => handleSubmit()}>
          Сохранить изменения
        </Button>
      </Footer>
    </>
  );
};
