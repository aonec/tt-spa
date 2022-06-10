import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apartmentDocumentsListService } from './apartmentDocumentsListService.model';
import { ApartmentDocumentsList } from './view/ApartmentDocumentsList';

export const ApartmentDocumentsListContainer = () => {
  const params = useParams<{apartmentId: string}>();
  const apartmentId = Number(params.apartmentId);

  const { outputs } = apartmentDocumentsListService;
  const { ApartmentDocumentsListGate } = apartmentDocumentsListService.gates;

  const documents = useStore(outputs.$documentsList);
  const isLoading = useStore(outputs.$isLoading);

  return (
    <>
      <ApartmentDocumentsListGate apartmentId={apartmentId} />
      <ApartmentDocumentsList documents={documents} isLoading={isLoading} />
    </>
  );
};
