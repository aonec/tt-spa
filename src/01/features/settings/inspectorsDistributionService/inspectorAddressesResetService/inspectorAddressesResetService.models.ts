import { displayInspectorsService } from '01/features/Inspectors/displayInspectors/displayInspectorsService.models';
import { createDomain } from 'effector';
import { createForm } from 'effector-forms/dist';
import { InspectorResponse } from 'myApi';
import { resetInspectorHousingStocksAddresses } from './inspectorAddressesResetService.api';

const inspectorAddressesResetServiceDomain = createDomain(
  'inspectorAddressesResetService'
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
