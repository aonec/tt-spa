import { createDomain, forward, guard, sample } from 'effector';
import {
  ResourceDisconnectingResponse,
  ResourceDisconnectingUpdateRequest,
} from 'myApi';
import {
  fetchDeleteResourceDisconnectingDocument,
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

const deleteDocument = domain.createEvent();
const deleteDocumentFx = domain.createEffect<string, void>(
  fetchDeleteResourceDisconnectingDocument
);

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

sample({
  source: guard({
    source: $resourceDisconnection,
    filter: Boolean,
  }),
  clock: deleteDocument,
  fn: (disconnection) => disconnection.id,
  target: deleteDocumentFx,
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
    deleteDocument,
  },
  outputs: {
    $resourceDisconnection,
    $isEdit,
    $isDisconectionLoading,
  },
};
