import { DisablingResourcesProps } from '../../ResourceDisablingScheduleService.types';

export type DisablingResourcesSearchProps = {
  applyFilters: (payload: DisablingResourcesProps) => void;
  cities: string[] | null;
  filters: DisablingResourcesProps;
};
