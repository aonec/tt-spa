import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apartmentsDocumentListService } from './apartmentsDocumentListService.model';
import { ApartmentDocumentsList } from './view/ApartmentDocumentsList';

const { gates, outputs, inputs } = apartmentsDocumentListService;

export const ApartmentsDocumentListContainer = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const { ApartmentIdGate } = gates;

  const isLoading = useStore(outputs.$isLoading);
  const documentsList = useStore(outputs.$apartmentDocumentsList);

  const handleSaveFile = useEvent(inputs.saveFile);

  return (
    <>
      <ApartmentIdGate apartmentId={Number(apartmentId)} />
      <ApartmentDocumentsList
        isLoading={isLoading}
        documentsList={documentsList}
        handleSaveFile={handleSaveFile}
      />
    </>
  );
};
