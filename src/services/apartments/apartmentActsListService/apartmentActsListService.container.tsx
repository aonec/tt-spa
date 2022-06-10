import { ApartmentActTypesGate } from '01/features/actsJournal/displayActTypes/models';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { createApartmentActService } from '../createApartmentActService';
import { deleteApartmentActService } from '../deleteApartmentActService';
import { apartmentActsListService } from './apartmentActsListService.model';
import { ApartmentActsList } from './view/ApartmentActsList';

export const ApartmentActsListContainer = () => {
  const params = useParams<{ 1: string }>();
  const apartmentId = Number(params[1]);

  const { outputs } = apartmentActsListService;
  const { ApartmentActsListGate } = apartmentActsListService.gates;

  const documents = useStore(outputs.$actsList);
  const isLoading = useStore(outputs.$isLoading);
  const actTypes = useStore(outputs.$actTypes);

  const handleOpeningCreateActModal = useEvent(
    createApartmentActService.inputs.openModal
  );
  const handleOpeningDeleteActModal = useEvent(
    deleteApartmentActService.inputs.openModal
  );

  return (
    <>
      <ApartmentActTypesGate />
      <ApartmentActsListGate apartmentId={apartmentId} />
      <ApartmentActsList
        acts={documents}
        isLoading={isLoading}
        handleOpeningCreateActModal={() => handleOpeningCreateActModal()}
        handleOpeningDeleteActModal={handleOpeningDeleteActModal}
        actTypes={actTypes}
      />
    </>
  );
};
