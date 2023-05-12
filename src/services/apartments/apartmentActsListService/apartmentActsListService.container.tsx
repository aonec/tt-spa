import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
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
import { ESecuredIdentityRoleName } from 'myApi';
import { usePermission } from 'hooks/usePermission';

const { outputs, inputs, gates } = apartmentActsListService;

export const ApartmentActsListContainer = () => {
  const params = useParams<{ apartmentId: string }>();
  const apartmentId = Number(params.apartmentId);

  const { ApartmentActsListGate } = gates;

  const documents = useStore(outputs.$filteredActsList);
  const isLoading = useStore(outputs.$isLoading);
  const selectedFilters = useStore(outputs.$actsFilter);

  const handleOpeningCreateActModal = useEvent(
    createApartmentActService.inputs.openModal,
  );
  const handleOpeningDeleteActModal = useEvent(
    deleteApartmentActService.inputs.openModal,
  );
  const handleOpeningEditActModal = useEvent(
    editApartmentActService.inputs.openModal,
  );
  const handleSaveFile = useEvent(inputs.saveFile);
  const updateTypes = useEvent(inputs.updateType);
  const updateResources = useEvent(inputs.updateResources);

  const isPermitionToChangeApartmentAct = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.ManagingFirmSpectator,
  ]);

  return (
    <>
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
        selectedFilters={selectedFilters}
        isPermitionToChangeApartmentAct={isPermitionToChangeApartmentAct}
      />
    </>
  );
};
