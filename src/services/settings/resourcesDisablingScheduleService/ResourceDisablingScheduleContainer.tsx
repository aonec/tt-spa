import React from 'react';
import { useUnit } from 'effector-react';
import { resourceDisablingScheduleServiceService } from './ResourceDisablingScheduleService.model';
import { DisablingResourceWrapperContainer } from './views/DisablingResourcesList/DisablingResoucesList.styles';
import { DisablingResourcesList } from './views/DisablingResourcesList/DisablingResoursesList';
import { DisablingResourcesSearch } from './views/DisablingResourcesSearchHeader/DisablingResourcesSearchHeader';
import {
  CompleteResourceDisconnectionContainer,
  completeResourceDisconnectionService,
} from 'services/resources/completeResourceDisconnectionService';
import {
  DeleteResourceDisconnectionContainer,
  deleteResourceDisconnectionService,
} from 'services/resources/deleteResourceDisconnectionService';
import { editResourceDisconnectionService } from 'services/resources/editResourceDisconnectionService';
import {
  DisplayResourceDisconenctionAddressesServiceContainer,
  displayResourceDisconenctionAddressesServiceService,
} from './views/displayResourceDisconenctionAddressesServiceService';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { usePermission } from 'hooks/usePermission';
import { ESecuredIdentityRoleName } from 'api/types';

const { inputs, outputs, gates } = resourceDisablingScheduleServiceService;
const { ExistingCitiesGate } = addressSearchService.gates;

export const ResourceDisablingScheduleContainer = () => {
  const DisablingResouresGate = gates.resourceDisablingGate;

  const {
    setFilters,
    filters,
    loading,
    openCompleteDisconnectionModal,
    openDeleteDisconnectionModal,
    openDissconectionAddressesModal,
    openEditDisconnectionModal,
    resources,
    setPage,
    cities,
  } = useUnit({
    resources: outputs.$disablingResources,
    loading: outputs.$loading,
    filters: outputs.$filters,
    setFilters: inputs.setFilters,
    setPage: inputs.setPage,
    openCompleteDisconnectionModal:
      completeResourceDisconnectionService.inputs.openModal,
    openDeleteDisconnectionModal:
      deleteResourceDisconnectionService.inputs.openModal,
    openEditDisconnectionModal:
      editResourceDisconnectionService.inputs.openEditModal,
    openDissconectionAddressesModal:
      displayResourceDisconenctionAddressesServiceService.inputs.openModal,
    cities: addressSearchService.outputs.$existingCities,
  });

  const isPermitionToChangeResourceDisabling = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);

  return (
    <DisablingResourceWrapperContainer>
      <ExistingCitiesGate />
      <DisablingResouresGate />
      <CompleteResourceDisconnectionContainer />
      <DeleteResourceDisconnectionContainer />
      <DisplayResourceDisconenctionAddressesServiceContainer />

      <DisablingResourcesSearch
        filters={filters}
        applyFilters={setFilters}
        cities={cities}
      />
      <DisablingResourcesList
        resources={resources}
        loading={loading}
        setPage={setPage}
        openModal={openDissconectionAddressesModal}
        handleOpenCompleteDisconnectionModal={openCompleteDisconnectionModal}
        handleOpenDeleteDisconnectionModal={openDeleteDisconnectionModal}
        handleOpenEditDisconnectionModal={openEditDisconnectionModal}
        isPermitionToChangeResourceDisabling={
          isPermitionToChangeResourceDisabling
        }
      />
    </DisablingResourceWrapperContainer>
  );
};
