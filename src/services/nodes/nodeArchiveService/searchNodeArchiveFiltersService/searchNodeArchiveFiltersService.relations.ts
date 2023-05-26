import { forward } from 'effector';
import { searchNodeArchiveFilters } from './searchNodeArchiveFiltersService.models';

forward({
  from: searchNodeArchiveFilters.inputs.applyFilters,
  to: searchNodeArchiveFilters.inputs.loadNodeArchiveData,
});
