import { sample } from 'effector';
import { searchNodeArchiveFilters } from './searchNodeArchiveFiltersService.models';

sample({
  clock: searchNodeArchiveFilters.inputs.applyFilters,
  target: searchNodeArchiveFilters.inputs.loadNodeArchiveData,
});
