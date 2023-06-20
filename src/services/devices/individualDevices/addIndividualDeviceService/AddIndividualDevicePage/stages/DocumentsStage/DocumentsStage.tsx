import React, { FC } from 'react';
import { DocumentsStageProps } from './DocumentsStage.types';
import {
  DocumentsUploadWrapper,
  Footer,
  FormHeader,
} from './DocumentsStage.styled';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { EDocumentType } from 'myApi';
import { Button } from 'ui-kit/Button';
import { useFormik } from 'formik';
import _ from 'lodash';

export const DocumentsStage: FC<DocumentsStageProps> = ({
  handleGoPrevStage,
}) => {
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      completedWorks: null as Document[] | null,
      devicePassport: null as Document[] | null,
      deviceCheck: null as Document[] | null,
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (data) => {
      const flatedDocumentIds = Object.entries(data)
        .map((data) => data[1]?.[0].id)
        .filter(Boolean);
    },
  });

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
        />
        <DocumentsUploadContainer
          uniqId="create-individual-device-passport"
          label="Добавьте паспорт прибора"
          max={1}
          documents={values.devicePassport}
          onChange={(value) => setFieldValue('devicePassport', value)}
          type={EDocumentType.DevicePassport}
        />
        <DocumentsUploadContainer
          uniqId="create-individual-device-check"
          label="Добавьте свидетельство о проверке прибора"
          max={1}
          documents={values.deviceCheck}
          onChange={(value) => setFieldValue('deviceCheck', value)}
          type={EDocumentType.DeviceTestCertificates}
        />
      </DocumentsUploadWrapper>

      <Footer>
        <Button type="ghost" onClick={handleGoPrevStage}>
          Назад
        </Button>
        <Button onClick={() => handleSubmit()}>Сохранить изменения</Button>
      </Footer>
    </>
  );
};
