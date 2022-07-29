import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ApartmentActTypesGate } from '../../../01/features/actsJournal/displayActTypes/models';
import {
  CreateApartmentActModalContainer,
  createApartmentActService,
} from '../createApartmentActService';
import {
  DeleteApartmentActModalContainer,
  deleteApartmentActService,
} from '../deleteApartmentActService';
import {
  EditApartmentActModalContainer,
  editApartmentActService,
} from '../editApartmentActService';
import { apartmentActsListService } from './apartmentActsListService.model';
import { ApartmentActsList } from './view/ApartmentActsList';

const { outputs, inputs, gates } = apartmentActsListService;

export const ApartmentActsListContainer = () => {
  const params = useParams<{ apartmentId: string }>();
  const apartmentId = Number(params.apartmentId);

  const { ApartmentActsListGate } = gates;

  const documents = useStore(outputs.$filteredActsList);
  const isLoading = useStore(outputs.$isLoading);
  const actTypes = useStore(outputs.$actTypes);
  const selectedFilters= useStore(outputs.$actsFilter)

  const handleOpeningCreateActModal = useEvent(
    createApartmentActService.inputs.openModal
  );
  const handleOpeningDeleteActModal = useEvent(
    deleteApartmentActService.inputs.openModal
  );
  const handleOpeningEditActModal = useEvent(
    editApartmentActService.inputs.openModal
  );
  const handleSaveFile = useEvent(inputs.saveFile);
  const updateTypes = useEvent(inputs.updateType);
  const updateResources = useEvent(inputs.updateResources);
  return (
    <>
      <ApartmentActTypesGate />
      <ApartmentActsListGate apartmentId={apartmentId} />
      <CreateApartmentActModalContainer />
      <EditApartmentActModalContainer />
      <DeleteApartmentActModalContainer />
      <ApartmentActsList
        acts={documents}
        isLoading={isLoading}
        handleOpeningCreateActModal={() => handleOpeningCreateActModal()}
        handleOpeningDeleteActModal={handleOpeningDeleteActModal}
        handleOpeningEditActModal={handleOpeningEditActModal}
        handleSaveFile={handleSaveFile}
        handleUpdateTypes={updateTypes}
        handleUpdateResources={updateResources}
        actTypes={actTypes}
        selectedFilters={selectedFilters}
      />
    </>
  );
};
