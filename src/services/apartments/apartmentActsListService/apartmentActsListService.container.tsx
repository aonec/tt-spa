import { ApartmentActTypesGate } from '01/features/actsJournal/displayActTypes/models';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { createApartmentActService } from '../createApartmentActService';
import { deleteApartmentActService } from '../deleteApartmentActService';
import { editApartmentActService } from '../editApartmentActService';
import { apartmentActsListService } from './apartmentActsListService.model';
import { ApartmentActsList } from './view/ApartmentActsList';

export const ApartmentActsListContainer = () => {
  const params = useParams<{ apartmentId: string }>();
  const apartmentId = Number(params.apartmentId);

  const { outputs, inputs } = apartmentActsListService;
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
  const handleOpeningEditActModal = useEvent(
    editApartmentActService.inputs.openModal
  );
  const handleSaveFile = useEvent(inputs.saveFile)

  return (
    <>
      <ApartmentActTypesGate />
      <ApartmentActsListGate apartmentId={apartmentId} />
      <ApartmentActsList
        acts={documents}
        isLoading={isLoading}
        handleOpeningCreateActModal={() => handleOpeningCreateActModal()}
        handleOpeningDeleteActModal={handleOpeningDeleteActModal}
        handleOpeningEditActModal={handleOpeningEditActModal}
        handleSaveFile={handleSaveFile}
        actTypes={actTypes}
      />
    </>
  );
};
