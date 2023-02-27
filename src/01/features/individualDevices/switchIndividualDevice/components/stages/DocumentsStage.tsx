import { useForm } from 'effector-forms/dist';
import React from 'react';
import { addIndividualDeviceForm } from '../../models';
import { FormHeader } from '../Header';
import { Document, DocumentsUploadContainer } from 'ui-kit/DocumentsService';
import { EDocumentType } from 'myApi';

export const DocumentsStage = () => {
  const { fields } = useForm(addIndividualDeviceForm);

  const { completedWorks, devicePassport, deviceCheck } =
    fields.documentsIds.value;

  const setFile =
    (name: 'completedWorks' | 'devicePassport' | 'deviceCheck') =>
    (files: Document[]) => {
      if (files.length === 0) return;

      const isFilesListEmpty = files.length === 0;

      const neededFile = isFilesListEmpty
        ? null
        : files[0] || fields.documentsIds.value[name];

      fields.documentsIds.onChange({
        ...fields.documentsIds.value,
        [name]: neededFile,
      });
    };

  return (
    <>
      <FormHeader>Документы</FormHeader>
      <DocumentsUploadContainer
        uniqId="create-individual-device-completed-works"
        label="Добавьте акт выполненных работ"
        documents={getFilesArrByFile(completedWorks)}
        max={1}
        onChange={setFile('completedWorks')}
        type={EDocumentType.DeviceAcceptanceAct}
      />

      <DocumentsUploadContainer
        uniqId="create-individual-device-passport"
        label="Добавьте паспорт прибора"
        documents={getFilesArrByFile(devicePassport)}
        max={1}
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
    </>
  );
};

function getFilesArrByFile(fileData: Document | null) {
  return fileData ? [fileData] : [];
}
