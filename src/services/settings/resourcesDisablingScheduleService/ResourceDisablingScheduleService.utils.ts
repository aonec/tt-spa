import {
  DisablingResourcesFilters,
  DisablingResourcesQueryParams,
} from './ResourceDisablingScheduleService.types';

export function getResourceDisconnectionQueryParams(
  filters: DisablingResourcesFilters,
): DisablingResourcesQueryParams {
  const { city, street, house, corpus, ...otherFilters } = filters;

  return {
    ...otherFilters,
    'Address.City': city,
    'Address.Street': street,
    'Address.HousingStockNumber': house,
    'Address.Corpus': corpus,
  };
}
