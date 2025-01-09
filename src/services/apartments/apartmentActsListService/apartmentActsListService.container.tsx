import { useUnit } from 'effector-react';
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
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';

const { outputs, inputs, gates } = apartmentActsListService;

export const ApartmentActsListContainer = () => {
  const params = useParams<{ apartmentId: string }>();
  const apartmentId = Number(params.apartmentId);

  const { ApartmentActsListGate } = gates;

  const {
    documents,
    isLoading,
    selectedFilters,
    handleOpeningCreateActModal,
    handleOpeningDeleteActModal,
    handleOpeningEditActModal,
    handleSaveFile,
    updateResources,
    updateTypes,
  } = useUnit({
    documents: outputs.$filteredActsList,
    isLoading: outputs.$isLoading,
    selectedFilters: outputs.$actsFilter,
    handleOpeningCreateActModal: createApartmentActService.inputs.openModal,
    handleOpeningDeleteActModal: deleteApartmentActService.inputs.openModal,
    handleOpeningEditActModal: editApartmentActService.inputs.openModal,
    handleSaveFile: inputs.saveFile,
    updateTypes: inputs.updateType,
    updateResources: inputs.updateResources,
  });

  const isPermitionToChangeApartmentAct = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.Operator,
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
