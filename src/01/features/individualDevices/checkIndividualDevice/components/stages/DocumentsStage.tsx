import { FileData } from '01/hooks/useFilesUpload';
import { FilesUpload } from '01/shared/ui/FilesUpload';
import { useForm } from 'effector-forms/dist';
import React from 'react';
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
    console.log(files);
    if (files.length === 0) return;
    fields.documentsIds.onChange({
      ...fields.documentsIds.value,
      [name]:
        files.length === 0
          ? null
          : files.length
          ? files[0]
          : fields.documentsIds.value[name],
    });
  };

  return (
    <>
      <FormHeader>Документы</FormHeader>
      <FilesUpload
        uniqId="create-individual-device-passport"
        text="Добавьте свидетельство о поверке прибора"
        filesInit={getFilesArrByFile(devicePassport)}
        max={1}
        onChange={setFile('devicePassport')}
        withoutDeletion
        type="DeviceTestCertificates"
      />
      <FilesUpload
        uniqId="create-individual-device-completed-works"
        text="Добавьте акт выполненных работ"
        filesInit={getFilesArrByFile(completedWorks)}
        max={1}
        onChange={setFile('completedWorks')}
        withoutDeletion
        type="DeviceAcceptanceAct"
      />
    </>
  );
};

function getFilesArrByFile(fileData: FileData | null) {
  return fileData ? [fileData] : [];
}
