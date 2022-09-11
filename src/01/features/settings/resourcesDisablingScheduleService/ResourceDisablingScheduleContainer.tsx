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

const { inputs, outputs, gates } = resourceDisablingScheduleServiceService;

export const ResourceDisablingScheduleContainer = () => {
  const DisablingResouresGate = gates.resourceDisablingGate;

  const resources = useStore(outputs.$disablingResources);
  const loading = useStore(outputs.$loading);
  const cities = useStore($existingCities);
  const filters = useStore(outputs.$filters);

  const applyFilters = useEvent(inputs.applyFilters);
  const setPage = useEvent(inputs.setPage);
  const isModalOpen = useStore(outputs.$isAddressesModalOpen);
  const openModal = useEvent(inputs.openAddressesModal);

  return (
    <DisablingResourceWrapperContainer>
      <ExistingCitiesGate />
      <DisablingResouresGate />
      <ResourceDisablingScheduleModal
        isModalOpen={isModalOpen}
        openModal={() => openModal()}
      />
      <DisablingResourcesSearch filters={filters} applyFilters={applyFilters} cities={cities} />
      <DisablingResourcesList
        resources={resources}
        loading={loading}
        setPage={setPage}
        openModal={() => openModal()}
      />
    </DisablingResourceWrapperContainer>
  );
};
