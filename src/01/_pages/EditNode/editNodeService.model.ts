import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { EMagistralTypeStringDictionaryItem, EResourceType } from 'myApi';
import { fetchPipeNodeMagistrals } from './editNodeService.api';

const domain = createDomain('editNodeService');

const clearStore = domain.createEvent();

const getMagistralsFx = domain.createEffect<
  EResourceType,
  EMagistralTypeStringDictionaryItem[]
>(fetchPipeNodeMagistrals);
const $magistrals = domain
  .createStore<EMagistralTypeStringDictionaryItem[]>([])
  .on(getMagistralsFx.doneData, (_, magistrals) => magistrals)
  .reset(clearStore);

export const NodeResourceGate = createGate<{ resource: EResourceType }>();

forward({
  from: NodeResourceGate.state.map(({ resource }) => resource),
  to: getMagistralsFx,
});

forward({
  from: NodeResourceGate.close,
  to: clearStore,
});

export const editNodeService = {
  outputs: {
    $magistrals,
  },
  gates: {
    NodeResourceGate,
  },
};
