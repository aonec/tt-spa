import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import {
  ResourceDisconnectingResponse,
  ResourceDisconnectingUpdateRequest,
} from 'api/types';
import {
  fetchEditResourceDisconnection,
  fetchResourceDisconnection,
  fetchUpdateResourceDisconnectingDocument,
} from './editResourceDisconnectionService.api';
import {
  ResourceDisconnectingUpdatePayload,
  UpdateDocumentPayload,
} from './editResourceDisconnectionService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const openEditModal = createEvent<string>();
const clearDisconnectionId = createEvent();

const updateDocument = createEvent<number>();
const updateDocumentFx = createEffect<UpdateDocumentPayload, void>(
  fetchUpdateResourceDisconnectingDocument,
);

const editResourceDisconnection =
  createEvent<ResourceDisconnectingUpdateRequest>();

const editResourceDisconnectionFx = createEffect<
  ResourceDisconnectingUpdatePayload,
  void,
  EffectFailDataAxiosError
>(fetchEditResourceDisconnection);

const getResourceDisconnectionFx = createEffect(fetchResourceDisconnection);

const $editedResourceDisconnectionId = createStore<string>('')
  .on(openEditModal, (_, id) => id)
  .reset(clearDisconnectionId);

const $isEdit = $editedResourceDisconnectionId.map((id) => Boolean(id));

const clearResourceDisconnection = createEvent();

const $resourceDisconnection =
  createStore<ResourceDisconnectingResponse | null>(null)
    .on(
      getResourceDisconnectionFx.doneData,
      (_, disconnection) => disconnection,
    )
    .reset(clearResourceDisconnection);

const $isDisconectionLoading = getResourceDisconnectionFx.pending;

const setEditResourceDisconnectionPayload =
  createEvent<ResourceDisconnectingUpdatePayload>();
const $editResourceDisconnectionPayload =
  createStore<ResourceDisconnectingUpdatePayload | null>(null).on(
    setEditResourceDisconnectionPayload,
    (_, data) => {
      const { id } = data;
      if (!id) {
        return null;
      }
      return data;
    },
  );

sample({
  clock: sample({
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
  clock: sample({
    clock: $editResourceDisconnectionPayload,
    filter: Boolean,
  }),
  target: editResourceDisconnectionFx,
});

sample({
  source: sample({
    source: $resourceDisconnection,
    filter: Boolean,
  }),
  clock: updateDocument,
  fn: (disconnection, documentId) => ({ id: disconnection.id, documentId }),
  target: updateDocumentFx,
});

editResourceDisconnectionFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
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
