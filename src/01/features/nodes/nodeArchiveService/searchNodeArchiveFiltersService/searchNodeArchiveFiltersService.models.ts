import { createDomain } from 'effector';
import { displayNodeArchiveService } from '../displayNodeArchiveService';
import { LoadNodeArchiveDataPayload } from '../displayNodeArchiveService/displayNodeArchiveService.types';

const searchNodeArchiveFiltersServiceDomain = createDomain(
  'searchNodeArchiveFiltersService'
);

const applyFilters = searchNodeArchiveFiltersServiceDomain.createEvent<LoadNodeArchiveDataPayload>();

export const searchNodeArchiveFilters = {
  inputs: {
    loadNodeArchiveData: displayNodeArchiveService.inputs.loadNodeArchiveData,
    applyFilters,
  },
  outputs: {
    $loading: displayNodeArchiveService.outputs.$loading,
  },
};
