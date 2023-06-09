import React from 'react';
import { useEvent, useStore } from 'effector-react';
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

const { inputs, outputs, gates } = resourceDisablingScheduleServiceService;
const { ExistingCitiesGate } = addressSearchService.gates;

export const ResourceDisablingScheduleContainer = () => {
  const DisablingResouresGate = gates.resourceDisablingGate;

  const resources = useStore(outputs.$disablingResources);
  const loading = useStore(outputs.$loading);
  const cities = useStore(addressSearchService.outputs.$existingCities);
  const filters = useStore(outputs.$filters);

  const applyFilters = useEvent(inputs.applyFilters);
  const setPage = useEvent(inputs.setPage);
  const openCompleteDisconnectionModal = useEvent(
    completeResourceDisconnectionService.inputs.openModal,
  );
  const openDeleteDisconnectionModal = useEvent(
    deleteResourceDisconnectionService.inputs.openModal,
  );
  const openEditDisconnectionModal = useEvent(
    editResourceDisconnectionService.inputs.openEditModal,
  );
  const openDissconectionAddressesModal = useEvent(
    displayResourceDisconenctionAddressesServiceService.inputs.openModal,
  );

  return (
    <DisablingResourceWrapperContainer>
      <ExistingCitiesGate />
      <DisablingResouresGate />
      <CompleteResourceDisconnectionContainer />
      <DeleteResourceDisconnectionContainer />
      <DisplayResourceDisconenctionAddressesServiceContainer />

      <DisablingResourcesSearch
        filters={filters}
        applyFilters={applyFilters}
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
      />
    </DisablingResourceWrapperContainer>
  );
};
