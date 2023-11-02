import { createEffect, createEvent, createStore } from 'effector';
import { guard, sample } from 'effector';
import { DocumentLiteResponse } from 'api/types';
import { fetchUpdateDocuments } from './editNodeUploadDocumentsService.api';
import { UpdateDocumentPayload } from './editNodeUploadDocumentsService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { editNodeService } from 'services/nodes/editNodeService/editNodeService.model';

const closeModal = createEvent();
const openModal = createEvent();
const $isOpenModal = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const updateDocumentsFx = createEffect<
  UpdateDocumentPayload,
  void,
  EffectFailDataAxiosError
>(fetchUpdateDocuments);

const updateDocuments = createEvent<DocumentLiteResponse[]>();

const $documents = createStore<DocumentLiteResponse[]>([])
  .on(editNodeService.outputs.$node, (_, node) => node?.documents || [])
  .on(updateDocuments, (_, documents) => documents);

sample({
  source: guard({
    source: editNodeService.outputs.$node.map((node) => node?.id),
    filter: Boolean,
  }),
  clock: updateDocuments,
  fn: (nodeId, documents) => ({
    nodeId,
    documentsIds: documents.map((document) => document.id),
  }),
  target: updateDocumentsFx,
});

updateDocumentsFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const editNodeUploadDocumentsService = {
  inputs: {
    updateDocuments,
    openModal,
    closeModal,
  },
  outputs: {
    $documents,
    $isOpenModal,
  },
};
