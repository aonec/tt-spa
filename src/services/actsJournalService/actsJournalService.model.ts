import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import {
  addAct,
  deleteDocument,
  fetchActs,
  uploadFile,
} from './actsJournalService.api';
import {
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
  DocumentResponse,
} from 'api/types';
import { message } from 'antd';
import { createGate } from 'effector-react';
import { ActsJournalRequestParams } from './actsJournalService.types';
import dayjs from 'api/dayjs';
import { addressIdSearchService } from './addressIdSearchService';
import { EffectFailDataAxiosError } from 'types';

const ActsJournalGate = createGate();

const updateActsFilter = createEvent<ActsJournalRequestParams>();

const setPageNumber = createEvent<number>();

const $actsFilter = createStore<ActsJournalRequestParams>({
  PageSize: 20,
  PageNumber: 1,
})
  .on(updateActsFilter, (oldFilter, newFilter) => {
    return {
      ...oldFilter,
      ...newFilter,
      PageNumber: 1,
    };
  })
  .on(setPageNumber, (oldFilter, PageNumber) => {
    return { ...oldFilter, PageNumber };
  })
  .reset(ActsJournalGate.close);

const getActs = createEvent();
const getActsFx = createEffect<
  ActsJournalRequestParams,
  ApartmentActResponsePagedList
>(fetchActs);

const $actsPagedData = createStore<ApartmentActResponsePagedList | null>(
  null,
).on(getActsFx.doneData, (_, data) => data);

const createAct = createEvent<Omit<AddApartmentActRequest, 'apartmentId'>>();
const createActFx = createEffect<AddApartmentActRequest, void>(addAct);

const handleUploadFile = createEvent<File>();
const uploadFileFx = createEffect<
  File,
  DocumentResponse[],
  EffectFailDataAxiosError
>(uploadFile);

const setModalOpen = createEvent<boolean>();
const $isDocumentModalOpen = createStore(false)
  .on(setModalOpen, (_, data) => data)
  .reset(uploadFileFx.doneData);

const setViewModalOpen = createEvent<boolean>();
const $isViewModalOpen = createStore(false).on(
  setViewModalOpen,
  (_, data) => data,
);

const setFile = createEvent<File | null>();
const $file = createStore<File | null>(null)
  .on(setFile, (_, file) => file)
  .reset(setModalOpen);

const handleDeleteDoc = createEvent<number>();
const deleteDocumentFx = createEffect<number, void, EffectFailDataAxiosError>(
  deleteDocument,
);

const $uploadedFile = createStore<DocumentResponse | null>(null)
  .on(uploadFileFx.doneData, (_, doc) => doc[0])
  .reset(deleteDocumentFx.doneData);

const $isCreateLoading = createActFx.pending;
const $isActsLoading = getActsFx.pending;

const actCreated = createActFx.doneData;

actCreated.watch(() => message.success('Акт успешно добавлен'));
createActFx.failData.watch(() => message.error('Ошибка при добавлении акта'));

sample({
  source: sample({
    source: addressIdSearchService.outputs.$apartmentSearchId,
    filter: Boolean,
  }),
  clock: createAct,
  fn: (apartmentId, payload) => ({
    ...payload,
    apartmentId,
    actJobDate: dayjs(payload.actJobDate).format('YYYY-MM-DD'),
  }),
  target: createActFx,
});

sample({
  clock: [ActsJournalGate.open, $actsFilter, actCreated],
  target: getActs,
});

sample({
  clock: getActs,
  source: { actsFilter: $actsFilter, gateStatus: ActsJournalGate.status },
  filter: ({ gateStatus }) => gateStatus,
  fn: ({ actsFilter }) => actsFilter,
  target: getActsFx,
});

sample({
  clock: handleUploadFile,
  target: uploadFileFx,
});

sample({
  clock: handleDeleteDoc,
  target: deleteDocumentFx,
});

const $isUploading = uploadFileFx.pending;

uploadFileFx.failData.watch((error) =>
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  ),
);

deleteDocumentFx.failData.watch((error) =>
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  ),
);

export const actsJournalService = {
  inputs: {
    createAct,
    updateActsFilter,
    setPageNumber,
    actCreated,
    setModalOpen,
    setFile,
    handleUploadFile,
    setViewModalOpen,
    handleDeleteDoc,
  },
  outputs: {
    $isCreateLoading,
    $actsPagedData,
    $actsFilter,
    $isActsLoading,
    $isDocumentModalOpen,
    $file,
    $uploadedFile,
    $isUploading,
    $isViewModalOpen,
  },
  gates: { ActsJournalGate },
};
