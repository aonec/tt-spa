import { createDomain, guard, sample } from 'effector';
import { DocumentLiteResponse } from 'myApi';
import { editNodeService } from 'services/devices/editNodeService/editNodeService.model';
import { fetchUpdateDocuments } from './editNodeUploadDocumentsService.api';
import { UpdateDocumentPayload } from './editNodeUploadDocumentsService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('editNodeUploadDocumentsService');

const closeModal = domain.createEvent();
const openModal = domain.createEvent();
const $isOpenModal = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const updateDocumentsFx = domain.createEffect<
  UpdateDocumentPayload,
  void,
  EffectFailDataAxiosError
>(fetchUpdateDocuments);

const updateDocuments = domain.createEvent<DocumentLiteResponse[]>();

const $documents = domain
  .createStore<DocumentLiteResponse[]>([])
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
