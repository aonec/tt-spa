import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
} from 'myApi';
import { DisablingResourcesProps } from './ResourceDisablingScheduleContainer.types';
import { fetchDisablingResources } from './ResourcesDisablingScheduleService.api';

const resourceDisablingScheduleServiceDomain = createDomain(
  'ResourceDisablingScheduleService'
);

const $disablingResources = resourceDisablingScheduleServiceDomain.createStore<
  ResourceDisconnectingResponse[] | null
>([]);

const resourceDisablingGate = createGate();

const resourceDisablingEvent = resourceDisablingScheduleServiceDomain.createEvent();

const resourceDisablingEventFx = resourceDisablingScheduleServiceDomain.createEffect<
  DisablingResourcesProps | unknown,
  ResourceDisconnectingResponsePagedList
>(fetchDisablingResources);

forward({
  from: resourceDisablingGate.open,
  to: resourceDisablingEventFx,
});

$disablingResources.on(
  resourceDisablingEventFx.doneData,
  (_, resources) => resources.items
);

const $loading = resourceDisablingEventFx.pending;

export const resourceDisablingScheduleServiceService = {
  inputs: {
    resourceDisablingEvent,
    resourceDisablingEventFx,
  },
  outputs: {
    $disablingResources,
    $loading,
  },
  gates: {
    resourceDisablingGate,
  },
};
