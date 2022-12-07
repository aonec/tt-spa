import React, { FC } from 'react';
import { Wrapper } from './DocumentsStep.styled';
import { DocumentsStepProps } from './DocumentsStep.types';
import { DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { useFormik } from 'formik';
import { Document } from 'ui-kit/DocumentsService/DocumentsService.types';

export const DocumentsStep: FC<DocumentsStepProps> = ({
  updateRequestPayload,
  handleFormComplete,
}) => {
  const { values, setFieldValue } = useFormik({
    initialValues: {
      actOfDoneWork: null as null | Document,
      devicePassport: null as null | Document,
      checkingAct: null as null | Document,
    },
    onSubmit: (values) => {
      const documentsIds: number[] = [
        values.actOfDoneWork?.id,
        values.checkingAct?.id,
        values.devicePassport?.id,
      ].filter((documentId): documentId is number => Boolean(documentId));

      updateRequestPayload({ documentsIds });

      handleFormComplete();
    },
  });

  return (
    <Wrapper>
      <DocumentsUploadContainer
        label="Добавьте акт выполненных работ"
        uniqId="act-of-done-work"
        documents={values.actOfDoneWork && [values.actOfDoneWork]}
        onChange={([document]) => setFieldValue('actOfDoneWork', document)}
        max={1}
      />
      <DocumentsUploadContainer
        label="Добавьте паспорт прибора"
        uniqId="device-passport"
        documents={values.devicePassport && [values.devicePassport]}
        onChange={([document]) => setFieldValue('devicePassport', document)}
        max={1}
      />
      <DocumentsUploadContainer
        label="Добавьте свидетельство о поверке прибора"
        uniqId="checking-act"
        documents={values.checkingAct && [values.checkingAct]}
        onChange={([document]) => setFieldValue('checkingAct', document)}
        max={1}
      />
    </Wrapper>
  );
};
