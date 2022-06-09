import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { createApartmentActService } from '../createApartmentActService';
import { apartmentActsListService } from './apartmentActsListService.model';
import { ApartmentActsList } from './view/ApartmentActsList';

export const ApartmentActsListContainer = () => {
  const params = useParams<{ 1: string }>();
  const apartmentId = Number(params[1]);

  const { outputs } = apartmentActsListService;
  const { ApartmentActsListGate } = apartmentActsListService.gates;

  const documents = useStore(outputs.$documentsList);
  const isLoading = useStore(outputs.$isLoading);

  const isDocumentsEmpty = !documents?.length;

  const handleOpeningCreateActModal = useEvent(
    createApartmentActService.inputs.openModal
  );

  return (
    <>
      <ApartmentActsListGate apartmentId={apartmentId} />
      <ApartmentActsList
        documents={documents}
        isLoading={isLoading}
        isDocumentsEmpty={isDocumentsEmpty}
        handleOpeningCreateDocumentModal={() =>
          handleOpeningCreateActModal()
        }
      />
    </>
  );
};
