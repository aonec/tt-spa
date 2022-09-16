import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { resourceDisablingScheduleServiceService } from './ResourceDisablingScheduleService.model';
import { DisablingResourceWrapperContainer } from './views/DisablingResourcesList/DisablingResoucesList.styles';
import { DisablingResourcesList } from './views/DisablingResourcesList/DisablingResoursesList';
import { DisablingResourcesSearch } from './views/DisablingResourcesSearchHeader/DisablingResourcesSearchHeader';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import { ResourceDisablingScheduleModal } from './ResourcesDisablingScheduleServiceModal/ResourceDisablingScheduleModal';
import {
  CompleteResourceDisconnectionContainer,
  completeResourceDisconnectionService,
} from 'services/resources/completeResourceDisconnectionService';
import {
  DeleteResourceDisconnectionContainer,
  deleteResourceDisconnectionService,
} from 'services/resources/deleteResourceDisconnectionService';

const { inputs, outputs, gates } = resourceDisablingScheduleServiceService;

export const ResourceDisablingScheduleContainer = () => {
  const DisablingResouresGate = gates.resourceDisablingGate;

  const resources = useStore(outputs.$disablingResources);
  const loading = useStore(outputs.$loading);
  const cities = useStore($existingCities);
  const filters = useStore(outputs.$filters);
  const isModalOpen = useStore(outputs.$isAddressesModalOpen);

  const applyFilters = useEvent(inputs.applyFilters);
  const setPage = useEvent(inputs.setPage);
  const openModal = useEvent(inputs.openAddressesModal);
  const closeModal = useEvent(inputs.closeAddressesModal);
  const openCompleteDisconnectionModal = useEvent(
    completeResourceDisconnectionService.inputs.openModal
  );
  const openDeleteDisconnectionModal = useEvent(
    deleteResourceDisconnectionService.inputs.openModal
  );

  return (
    <DisablingResourceWrapperContainer>
      <ExistingCitiesGate />
      <DisablingResouresGate />
      <CompleteResourceDisconnectionContainer />
      <DeleteResourceDisconnectionContainer />

      <ResourceDisablingScheduleModal
        isModalOpen={isModalOpen}
        openModal={() => openModal()}
        closeModal={() => closeModal()}
      />
      <DisablingResourcesSearch
        filters={filters}
        applyFilters={applyFilters}
        cities={cities}
      />
      <DisablingResourcesList
        resources={resources}
        loading={loading}
        setPage={setPage}
        openModal={() => openModal()}
        handleOpenCompleteDisconnectionModal={openCompleteDisconnectionModal}
        handleOpenDeleteDisconnectionModal={openDeleteDisconnectionModal}
      />
    </DisablingResourceWrapperContainer>
  );
};
