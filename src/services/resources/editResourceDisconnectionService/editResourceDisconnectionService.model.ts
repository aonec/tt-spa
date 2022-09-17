import { createDomain, forward, guard, sample } from 'effector';
import {
  ResourceDisconnectingResponse,
  ResourceDisconnectingUpdateRequest,
} from 'myApi';
import {
  fetchEditResourceDisconnection,
  fetchResourceDisconnection,
} from './editResourceDisconnectionService.api';
import { ResourceDisconnectingUpdatePayload } from './editResourceDisconnectionService.types';

const domain = createDomain('editResourceDisconnectionService');

const openEditModal = domain.createEvent<string>();
const clearDisconnectionId = domain.createEvent();

const editResourceDisconnection = domain.createEvent<ResourceDisconnectingUpdateRequest>();
const editResourceDisconnectionFx = domain.createEffect<
  ResourceDisconnectingUpdatePayload,
  void
>(fetchEditResourceDisconnection);

const getResourceDisconnectionFx = domain.createEffect(
  fetchResourceDisconnection
);

const $editedResourceDisconnectionId = domain
  .createStore<string>('')
  .on(openEditModal, (_, id) => id)
  .reset(clearDisconnectionId);

const $isEdit = $editedResourceDisconnectionId.map((id) => Boolean(id));

const clearResourceDisconnection = domain.createEvent();

const $resourceDisconnection = domain
  .createStore<ResourceDisconnectingResponse | null>(null)
  .on(getResourceDisconnectionFx.doneData, (_, disconnection) => disconnection)
  .reset(clearResourceDisconnection);

const $isDisconectionLoading = getResourceDisconnectionFx.pending;

sample({
  clock: guard({
    clock: $editedResourceDisconnectionId,
    filter: Boolean,
  }),
  target: getResourceDisconnectionFx,
});

sample({
  source: guard({
    source: $editedResourceDisconnectionId,
    filter: Boolean,
  }),
  clock: editResourceDisconnection,
  fn: (id, payload) => ({ id, payload }),
  target: editResourceDisconnectionFx,
});

export const editResourceDisconnectionService = {
  inputs: {
    openEditModal,
    clearDisconnectionId,
    clearResourceDisconnection,
    editResourceDisconnectionFx,
    editResourceDisconnection,
  },
  outputs: {
    $resourceDisconnection,
    $isEdit,
    $isDisconectionLoading,
  },
};

$editedResourceDisconnectionId.watch(console.log);
