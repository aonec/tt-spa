import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { apartmentsDocumentListService } from './apartmentsDocumentListService.model';
import { ApartmentDocumentsList } from './view/ApartmentDocumentsList';

const { outputs, inputs } = apartmentsDocumentListService;

export const ApartmentsDocumentListContainer = () => {
  const isLoading = useStore(outputs.$isLoading);
  const documentsList = useStore(outputs.$preparedDocumentsList);

  const handleSaveFile = useEvent(inputs.saveFile);

  return (
    <>
      <ApartmentDocumentsList
        isLoading={isLoading}
        documentsList={documentsList}
        handleSaveFile={handleSaveFile}
      />
    </>
  );
};
