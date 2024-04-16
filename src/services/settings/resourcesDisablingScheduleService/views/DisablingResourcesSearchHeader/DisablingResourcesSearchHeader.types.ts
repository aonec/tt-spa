import { DisablingResourcesFilters } from '../../ResourceDisablingScheduleService.types';

export type DisablingResourcesSearchProps = {
  applyFilters: (payload: DisablingResourcesFilters) => void;
  cities: string[] | null;
  filters: DisablingResourcesFilters;
};
