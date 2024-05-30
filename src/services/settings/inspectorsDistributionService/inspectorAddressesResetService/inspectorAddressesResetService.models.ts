import { message } from 'antd';
import { InspectorResponse } from 'api/types';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';
import { resetInspectorHousingStocksAddresses } from './inspectorAddressesResetService.api';

const openModal = createEvent();
const closeModal = createEvent();
const handleSelectInspector = createEvent<number>();

const resetAddresses = createEvent();

const resetAddressesFx = createEffect<number, InspectorResponse | null>(
  resetInspectorHousingStocksAddresses,
);

const $loading = resetAddressesFx.pending;

const $inspectorId = createStore<number | null>(null)
  .on(handleSelectInspector, (_, id) => id)
  .reset(closeModal);

const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

sample({
  clock: resetAddresses,
  source: $inspectorId,
  filter: (id) => Boolean(id),
  fn: (id) => id!,
  target: resetAddressesFx,
});

sample({
  clock: resetAddressesFx.doneData,
  target: [
    closeModal,
    searchInspectorsHousingStockService.forms.searchForm.submit,
  ],
});

resetAddressesFx.doneData.watch(() =>
  message.success('Адреса успешно сброшены!'),
);

resetAddressesFx.failData.watch(() => message.error('Ошибка сброса адресов'));

export const inspectorAddressesResetService = {
  inputs: {
    openModal,
    closeModal,
    resetAddresses,
    resetAddressesFx,
    handleSelectInspector,
  },
  outputs: {
    $loading,
    $isModalOpen,
    $inspectorsList: displayInspectorsService.outputs.$inspectorsList,
    $inspectorId,
  },
};
