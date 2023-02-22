import { useForm } from 'effector-forms/dist';
import React from 'react';
import { addIndividualDeviceForm } from '../../models';
import { FormHeader } from '../Header';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { EDocumentType } from 'myApi';
import { DocumentsUploadWrapper } from './BaseInfoStage.styled';

export const DocumentsStage = () => {
  const { fields } = useForm(addIndividualDeviceForm);

  const { completedWorks, devicePassport, deviceCheck } =
    fields.documentsIds.value;

  const setFile =
    (name: 'completedWorks' | 'devicePassport' | 'deviceCheck') =>
    (documents: Document[]) => {
      const isFilesListEmpty = documents.length === 0;

      const neededFile = isFilesListEmpty
        ? null
        : documents[0] || fields.documentsIds.value[name];

      fields.documentsIds.onChange({
        ...fields.documentsIds.value,
        [name]: neededFile,
      });
    };

  function getFilesArrByFile(fileData: Document | null) {
    return fileData ? [fileData] : [];
  }

  return (
    <>
      <FormHeader>Документы</FormHeader>

      <DocumentsUploadWrapper>
        <DocumentsUploadContainer
          uniqId="create-individual-device-completed-works"
          label="Добавьте акт выполненных работ"
          max={1}
          documents={getFilesArrByFile(completedWorks)}
          onChange={setFile('completedWorks')}
          type={EDocumentType.DeviceAcceptanceAct}
        />
        <DocumentsUploadContainer
          uniqId="create-individual-device-passport"
          label="Добавьте паспорт прибора"
          max={1}
          documents={getFilesArrByFile(devicePassport)}
          onChange={setFile('devicePassport')}
          type={EDocumentType.DevicePassport}
        />
        <DocumentsUploadContainer
          uniqId="create-individual-device-check"
          label="Добавьте свидетельство о проверке прибора"
          max={1}
          documents={getFilesArrByFile(deviceCheck)}
          onChange={setFile('deviceCheck')}
          type={EDocumentType.DeviceTestCertificates}
        />
      </DocumentsUploadWrapper>
      {/* <FilesUpload
        uniqId="create-individual-device-completed-works"
        text="Добавьте акт выполненных работ"
        filesInit={getFilesArrByFile(completedWorks)}
        max={1}
        onChange={setFile('completedWorks')}
        withoutDeletion
        type="DeviceAcceptanceAct"
      /> */}

      {/* <FilesUpload
        uniqId="create-individual-device-passport"
        text="Добавьте паспорт прибора"
        filesInit={getFilesArrByFile(devicePassport)}
        max={1}
        onChange={setFile('devicePassport')}
        withoutDeletion
        type="DevicePassport"
      /> */}

      {/* <FilesUpload
        uniqId="create-individual-device-check"
        text="Добавьте свидетельство о проверке прибора"
        max={1}
        filesInit={getFilesArrByFile(deviceCheck)}
        onChange={setFile('deviceCheck')}
        withoutDeletion
        type="DeviceTestCertificates"
      /> */}
    </>
  );
};
