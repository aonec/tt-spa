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

export const ResourceDisablingScheduleContainer = () => {
  const DisablingResouresGate =
    resourceDisablingScheduleServiceService.gates.resourceDisablingGate;
  const resources = useStore(
    resourceDisablingScheduleServiceService.outputs.$disablingResources
  );
  const loading = useStore(
    resourceDisablingScheduleServiceService.outputs.$loading
  );
  const cities = useStore($existingCities);

  const applyFilters = useEvent(
    resourceDisablingScheduleServiceService.inputs.applyFilters
  );
  const setPage = useEvent(
    resourceDisablingScheduleServiceService.inputs.setPage
  );
  const isModalOpen = useStore(
    resourceDisablingScheduleServiceService.outputs.$isAddressesModalOpen
  );
  const openModal = useEvent(
    resourceDisablingScheduleServiceService.inputs.openAddressesModal
  );


  return (
    <DisablingResourceWrapperContainer>
      <ExistingCitiesGate />
      <DisablingResouresGate />
      <ResourceDisablingScheduleModal
        isModalOpen={isModalOpen}
        openModal={() => openModal()}
      />
      <DisablingResourcesSearch applyFilters={applyFilters} cities={cities} />
      <DisablingResourcesList
        resources={resources}
        loading={loading}
        setPage={setPage}
        openModal={() => openModal()}
      />
    </DisablingResourceWrapperContainer>
  );
};
