import { useForm } from 'effector-forms/dist';
import React from 'react';
import { FileData } from '../../../../../hooks/useFilesUpload';
import { FilesUpload } from '../../../../../shared/ui/FilesUpload';
import { addIndividualDeviceForm } from '../../models';
import { FormHeader } from '../Header';

export const DocumentsStage = () => {
  const { fields } = useForm(addIndividualDeviceForm);

  const {
    completedWorks,
    devicePassport,
    deviceCheck,
  } = fields.documentsIds.value;

  const setFile = (
    name: 'completedWorks' | 'devicePassport' | 'deviceCheck'
  ) => (files: FileData[]) => {
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
      <FilesUpload
        uniqId="create-individual-device-completed-works"
        text="Добавьте акт выполненных работ"
        filesInit={getFilesArrByFile(completedWorks)}
        max={1}
        onChange={setFile('completedWorks')}
        withoutDeletion
        type="DeviceAcceptanceAct"
      />

      <FilesUpload
        uniqId="create-individual-device-passport"
        text="Добавьте паспорт прибора"
        filesInit={getFilesArrByFile(devicePassport)}
        max={1}
        onChange={setFile('devicePassport')}
        withoutDeletion
        type="DevicePassport"
      />

      <FilesUpload
        uniqId="create-individual-device-check"
        text="Добавьте свидетельство о проверке прибора"
        max={1}
        filesInit={getFilesArrByFile(deviceCheck)}
        onChange={setFile('deviceCheck')}
        withoutDeletion
        type="DeviceTestCertificates"
      />
    </>
  );
};

function getFilesArrByFile(fileData: FileData | null) {
  return fileData ? [fileData] : [];
}
