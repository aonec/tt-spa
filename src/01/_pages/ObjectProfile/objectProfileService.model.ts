import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
} from 'myApi';
import { fetchResourceDisconnectionOnHousingStock } from './objectProfileService.api';

const domain = createDomain('objectProfileService');

const $resourceDisconnections = domain.createStore<
  ResourceDisconnectingResponse[]
>([]);

const getResourceDisconnections = domain.createEffect<
  number,
  ResourceDisconnectingResponsePagedList
>(fetchResourceDisconnectionOnHousingStock);

$resourceDisconnections.on(
  getResourceDisconnections.doneData,
  (_, disconnectionPagedData) => disconnectionPagedData.items || []
);

const ObjectProfileIdGate = createGate<{ objectId: number }>();

forward({
  from: ObjectProfileIdGate.open.map(({ objectId }) => objectId),
  to: getResourceDisconnections,
});

export const objectProfileService = {
  outputs: {
    $resourceDisconnections,
  },
  gates: {
    ObjectProfileIdGate,
  },
};
