import { createDomain, forward, sample } from 'effector';
import { StreetWithHousingStockNumbersResponsePagedList } from 'myApi';
import { TreeSelectElement } from 'ui-kit/shared_components/AddressTreeSelect/AddressTreeSelect.types';
import { prepareAddressesForTreeSelect } from 'ui-kit/shared_components/AddressTreeSelect/AddressTreeSelect.utils';
import {
  fetchAddresses,
  fetchDownloadHeatIndividualDeviceReport,
} from './heatIndividualDevicesReportService.api';
import { HeatIndividualDevicesReportPayload } from './heatIndividualDevicesReportService.types';

const domain = createDomain('heatIndividualDevicesReportService');

const openModal = domain.createEvent();
const closeModal = domain.createEvent();
const $isOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const downloadReportFx = domain.createEffect<
  HeatIndividualDevicesReportPayload,
  void
>(fetchDownloadHeatIndividualDeviceReport);
const downloadReport = domain.createEvent<HeatIndividualDevicesReportPayload>();

const $isLoading = downloadReportFx.pending;

const clearCity = domain.createEvent();
const selectCity = domain.createEvent<string>();
const $selectedCity = domain
  .createStore<string | null>(null)
  .on(selectCity, (_, city) => city)
  .reset(clearCity);

const getAddressesFx = domain.createEffect<
  string,
  StreetWithHousingStockNumbersResponsePagedList
>(fetchAddresses);

const $treeData = domain
  .createStore<TreeSelectElement[]>([])
  .on(getAddressesFx.doneData, (_, data) =>
    prepareAddressesForTreeSelect({
      items: data.items || [],
    }),
  );

sample({
  clock: downloadReport,
  target: downloadReportFx,
});

sample({
  clock: $selectedCity,
  filter: Boolean,
  target: getAddressesFx,
});

forward({
  from: downloadReportFx.doneData,
  to: [closeModal, clearCity],
});

export const heatIndividualDevicesReportService = {
  inputs: {
    closeModal,
    openModal,
    downloadReport,
    selectCity,
  },
  outputs: {
    $isOpen,
    $treeData,
    $selectedCity,
    $isLoading,
  },
};
