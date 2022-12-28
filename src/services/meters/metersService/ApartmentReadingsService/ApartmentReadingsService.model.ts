import { createDomain } from 'effector';
import { SearchMode } from './view/ApartmentsReadings/ApartmentsReadings.types';

const domain = createDomain('apartmentReadingsService');

const setSearchMode = domain.createEvent<SearchMode>();

const $searchMode = domain
  .createStore(SearchMode.Apartment)
  .on(setSearchMode, (_, mode) => mode);

export const apartmentReadingsService = {
  inputs: { setSearchMode },
  outputs: { $searchMode },
};
