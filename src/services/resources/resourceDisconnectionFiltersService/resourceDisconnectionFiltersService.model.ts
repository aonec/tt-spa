import { createDomain, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { ResourceDisconnectingFilterResponse } from 'myApi';
import { fetchResourceDisconnectionFilters } from './resourceDisconnectionFiltersService.api';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('resourceDisconnectionFiltersService');

const $resourceDisconnectionFilters =
  domain.createStore<ResourceDisconnectingFilterResponse | null>(null);

const getResourceDisconnectionFiltersFx = domain.createEffect<
  void,
  ResourceDisconnectingFilterResponse,
  EffectFailDataAxiosError
>(fetchResourceDisconnectionFilters);

$resourceDisconnectionFilters.on(
  getResourceDisconnectionFiltersFx.doneData,
  (_, filters) => filters,
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

getResourceDisconnectionFiltersFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const resourceDisconnectionFiltersService = {
  outputs: { $resourceDisconnectionFilters },
  gates: {
    ResourceDisconnectigFiltersGate,
  },
};
