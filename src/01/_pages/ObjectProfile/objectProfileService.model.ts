import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
} from 'myApi';
import { apartmentsGroupService } from 'services/apartments/apartmentsGroupService';
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
  inputs: {
    setApartmentId: apartmentsGroupService.inputs.setApartmentId,
  },
  outputs: {
    $resourceDisconnections,
    $apartmentId: apartmentsGroupService.outputs.apartmentId,
  },
  gates: {
    ObjectProfileIdGate,
  },
};
