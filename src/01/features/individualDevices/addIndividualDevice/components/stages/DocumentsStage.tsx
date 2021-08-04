import { FileData } from '01/hooks/useFilesUpload';
import { DragAndDrop } from '01/shared/ui/DragAndDrop';
import { FilesUpload } from '01/shared/ui/FilesUpload';
import { Spaces } from '01/shared/ui/Layout/Space/Space';
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
  ) => (files: FileData[]) =>
    fields.documentsIds.onChange({
      ...fields.documentsIds.value,
      [name]: files[0],
    });
  
  return (
    <>
      <FormHeader>Документы</FormHeader>
      <FilesUpload
        uniqId="create-individual-device-completed-works"
        text="Добавьте акт выполненных работ"
        filesInit={getFilesArrByFile(completedWorks)}
        max={1}
        onChange={setFile('completedWorks')}
      />

      <FilesUpload
        uniqId="create-individual-device-passport"
        text="Добавьте паспорт прибора"
        filesInit={getFilesArrByFile(devicePassport)}
        max={1}
        onChange={setFile('devicePassport')}
      />

      <FilesUpload
        uniqId="create-individual-device-check"
        text="Добавьте свидетельство о проверке прибора"
        max={1}
        filesInit={getFilesArrByFile(deviceCheck)}
        onChange={setFile('deviceCheck')}
      />
    </>
  );
};

function getFilesArrByFile(fileData: FileData | null) {
  if (fileData) return [fileData];
}
