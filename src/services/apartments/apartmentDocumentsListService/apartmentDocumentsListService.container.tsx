import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apartmentDocumentsListService } from './apartmentDocumentsListService.model';
import { ApartmentDocumentsList } from './view/ApartmentDocumentsList';

export const ApartmentDocumentsListContainer = () => {
  const params = useParams<{ 1: string }>();
  const apartmentId = Number(params[1]);

  const { outputs } = apartmentDocumentsListService;
  const { ApartmentDocumentsListGate } = apartmentDocumentsListService.gates;

  const documents = useStore(outputs.$documentsList);
  const isLoading = useStore(outputs.$isLoading);

  const isDocumentsEmpty = !documents?.length;

  return (
    <>
      <ApartmentDocumentsListGate apartmentId={apartmentId} />
      <ApartmentDocumentsList
        documents={documents}
        isLoading={isLoading}
        isDocumentsEmpty={isDocumentsEmpty}
      />
    </>
  );
};
