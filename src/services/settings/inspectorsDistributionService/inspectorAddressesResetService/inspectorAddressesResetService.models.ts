import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';
import { InspectorResponse } from 'myApi';
import { resetInspectorHousingStocksAddresses } from './inspectorAddressesResetService.api';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';
import { message } from 'antd';

const inspectorAddressesResetServiceDomain = createDomain(
  'inspectorAddressesResetService',
);

const $isModalOpen = inspectorAddressesResetServiceDomain.createStore(false);

const openModal = inspectorAddressesResetServiceDomain.createEvent();
const closeModal = inspectorAddressesResetServiceDomain.createEvent();

const resetAddresses = inspectorAddressesResetServiceDomain.createEvent();

const resetAddressesFx = inspectorAddressesResetServiceDomain.createEffect<
  number,
  InspectorResponse | null
>(resetInspectorHousingStocksAddresses);

const $loading = resetAddressesFx.pending;

const resetAddressesForm = createForm({
  fields: {
    inspectorId: { init: null as number | null },
  },
});

$isModalOpen.on(openModal, () => true).reset(closeModal);

sample({
  clock: closeModal,
  target: resetAddressesForm.reset,
});

sample({
  clock: resetAddressesForm.formValidated,
  fn: (values) => values.inspectorId!,
  target: resetAddressesFx,
});

sample({
  clock: resetAddressesFx.doneData,
  to: [closeModal, searchInspectorsHousingStockService.forms.searchForm.submit],
});

sample({
  clock: resetAddresses,
  target: resetAddressesForm.validate,
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
  },
  outputs: {
    $loading,
    $isModalOpen,
    $inspectorsList: displayInspectorsService.outputs.$inspectorsList,
  },
  form: resetAddressesForm,
};
