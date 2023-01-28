import { createDomain, guard, sample } from 'effector';
import {
  ResourceDisconnectingResponse,
  ResourceDisconnectingUpdateRequest,
} from 'myApi';
import {
  fetchEditResourceDisconnection,
  fetchResourceDisconnection,
  fetchUpdateResourceDisconnectingDocument,
} from './editResourceDisconnectionService.api';
import {
  ResourceDisconnectingUpdatePayload,
  UpdateDocumentPayload,
} from './editResourceDisconnectionService.types';

const domain = createDomain('editResourceDisconnectionService');

const openEditModal = domain.createEvent<string>();
const clearDisconnectionId = domain.createEvent();

const updateDocument = domain.createEvent<number>();
const updateDocumentFx = domain.createEffect<UpdateDocumentPayload, void>(
  fetchUpdateResourceDisconnectingDocument
);

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

const setEditResourceDisconnectionPayload = domain.createEvent<ResourceDisconnectingUpdatePayload>();
const $editResourceDisconnectionPayload = domain
  .createStore<ResourceDisconnectingUpdatePayload | null>(null)
  .on(setEditResourceDisconnectionPayload, (_, data) => {
    const { id } = data;
    if (!id) {
      return null;
    }
    return data;
  });

sample({
  clock: guard({
    clock: $editedResourceDisconnectionId,
    filter: Boolean,
  }),
  target: getResourceDisconnectionFx,
});

sample({
  source: $editedResourceDisconnectionId,
  clock: editResourceDisconnection,
  fn: (id, payload) => ({ id, payload }),
  target: setEditResourceDisconnectionPayload,
});

sample({
  clock: guard({
    clock: $editResourceDisconnectionPayload,
    filter: Boolean,
  }),
  target: editResourceDisconnectionFx,
});

sample({
  source: guard({
    source: $resourceDisconnection,
    filter: Boolean,
  }),
  clock: updateDocument,
  fn: (disconnection, documentId) => ({ id: disconnection.id, documentId }),
  target: updateDocumentFx,
});

export const editResourceDisconnectionService = {
  inputs: {
    openEditModal,
    clearDisconnectionId,
    clearResourceDisconnection,
    editResourceDisconnectionFx,
    editResourceDisconnection,
    updateDocument,
  },
  outputs: {
    $resourceDisconnection,
    $isEdit,
    $isDisconectionLoading,
  },
};
