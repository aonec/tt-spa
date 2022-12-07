import { createDomain, guard, sample } from 'effector';
import { DocumentLiteResponse } from 'myApi';
import { editNodeService } from 'services/devices/editNodeService/editNodeService.model';
import { fetchUpdateDocuments } from './editNodeUploadDocumentsService.api';
import { UpdateDocumentPayload } from './editNodeUploadDocumentsService.types';

const domain = createDomain('editNodeUploadDocumentsService');

const closeModal = domain.createEvent();
const openModal = domain.createEvent();
const $isOpenModal = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const updateDocumentsFx = domain.createEffect<UpdateDocumentPayload, void>(
  fetchUpdateDocuments
);
const updateDocuments = domain.createEvent<DocumentLiteResponse[]>();

const $documents = editNodeService.outputs.$node
  .map((node) => node?.documents || [])
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
