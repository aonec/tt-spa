import { message } from 'antd';
import { forward, sample } from 'effector';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';
import { inspectorAddressesResetService } from './inspectorAddressesResetService.models';

inspectorAddressesResetService.outputs.$isModalOpen
  .on(inspectorAddressesResetService.inputs.openModal, () => true)
  .reset(inspectorAddressesResetService.inputs.closeModal);

forward({
  from: inspectorAddressesResetService.inputs.closeModal,
  to: inspectorAddressesResetService.form.reset,
});

sample({
  source: inspectorAddressesResetService.form.$values,
  clock: inspectorAddressesResetService.form.formValidated,
  fn: (values) => values.inspectorId!,
  target: inspectorAddressesResetService.inputs.resetAddressesFx,
});

forward({
  from: inspectorAddressesResetService.inputs.resetAddressesFx.doneData,
  to: [
    inspectorAddressesResetService.inputs.closeModal,
    searchInspectorsHousingStockService.forms.searchForm.submit,
  ],
});

forward({
  from: inspectorAddressesResetService.inputs.resetAddresses,
  to: inspectorAddressesResetService.form.validate,
});

inspectorAddressesResetService.inputs.resetAddressesFx.doneData.watch(() =>
  message.success('Адреса успешно сброшены!')
);

inspectorAddressesResetService.inputs.resetAddressesFx.failData.watch(() =>
  message.error('Ошибка сброса адресов')
);
