import { HouseManagementResponse } from 'api/types';
import { DisablingResourcesFilters } from '../../ResourceDisablingScheduleService.types';

export type DisablingResourcesSearchProps = {
  applyFilters: (payload: DisablingResourcesFilters) => void;
  filters: DisablingResourcesFilters;
  houseManagements: HouseManagementResponse[];
};
