import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { resourceDisablingScheduleServiceService } from './ResourceDisablingScheduleService.model';
import { DisablingResourceWrapperContainer } from './views/DisablingResourcesList/DisablingResoucesList.styles';
import { DisablingResourcesList } from './views/DisablingResourcesList/DisablingResoursesList';
import { DisablingResourcesSearch } from './views/DisablingResourcesSearchHeader/DisablingResourcesSearchHeader';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';

export const ResourceDisablingScheduleContainer = () => {
  const DisablingResouresGate =
    resourceDisablingScheduleServiceService.gates.resourceDisablingGate;
  const resources = useStore(
    resourceDisablingScheduleServiceService.outputs.$disablingResources
  );
  const loading = useStore(
    resourceDisablingScheduleServiceService.outputs.$loading
  );
  const applyFilters = useEvent(
    resourceDisablingScheduleServiceService.inputs.applyFilters
  );
  const setPage = useEvent(resourceDisablingScheduleServiceService.inputs.setPage)

  const cities = useStore($existingCities);

  return (
    <DisablingResourceWrapperContainer>
      <ExistingCitiesGate />
      <DisablingResouresGate PageSize={20}/>
      <DisablingResourcesSearch applyFilters={applyFilters} cities={cities}/>
      <DisablingResourcesList resources={resources} loading={loading} setPage={setPage}/>
    </DisablingResourceWrapperContainer>
  );
};
