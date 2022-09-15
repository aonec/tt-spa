import { createDomain, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { ResourceDisconnectingFilterResponse } from 'myApi';
import { fetchResourceDisconnectionFilters } from './resourceDisconnectionFiltersService.api';

const domain = createDomain('resourceDisconnectionFiltersService');

const $resourceDisconnectionFilters = domain.createStore<ResourceDisconnectingFilterResponse | null>(
  null
);
const getResourceDisconnectionFiltersFx = domain.createEffect<
  void,
  ResourceDisconnectingFilterResponse
>(fetchResourceDisconnectionFilters);

$resourceDisconnectionFilters.on(
  getResourceDisconnectionFiltersFx.doneData,
  (_, filters) => filters
);

const ResourceDisconnectigFiltersGate = createGate();

sample({
  clock: guard({
    source: $resourceDisconnectionFilters,
    clock: ResourceDisconnectigFiltersGate.open,
    filter: (source) => !source,
  }),
  target: getResourceDisconnectionFiltersFx,
});

export const resourceDisconnectionFiltersService = {
  outputs: { $resourceDisconnectionFilters },
  gates: {
    ResourceDisconnectigFiltersGate,
  },
};
