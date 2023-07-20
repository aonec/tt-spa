import { createDomain, forward, sample } from 'effector';
import { StreetWithBuildingNumbersResponsePagedList } from 'api/types';
import { TreeSelectElement } from 'ui-kit/sharedComponents/AddressTreeSelect/AddressTreeSelect.types';
import { prepareAddressesForTreeSelect } from 'ui-kit/sharedComponents/AddressTreeSelect/AddressTreeSelect.utils';
import {
  fetchAddresses,
  fetchDownloadHeatIndividualDeviceReport,
} from './heatIndividualDevicesReportService.api';
import { HeatIndividualDevicesReportPayload } from './heatIndividualDevicesReportService.types';

const domain = createDomain('heatIndividualDevicesReportService');

const clearStore = domain.createEvent();

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

const selectCity = domain.createEvent<string>();
const $selectedCity = domain
  .createStore<string | null>(null)
  .on(selectCity, (_, city) => city)
  .reset(clearStore);

const getAddressesFx = domain.createEffect<
  string,
  StreetWithBuildingNumbersResponsePagedList
>(fetchAddresses);

const $treeData = domain
  .createStore<TreeSelectElement[]>([])
  .on(getAddressesFx.doneData, (_, data) =>
    prepareAddressesForTreeSelect({
      items: data.items || [],
    }),
  )
  .reset(clearStore);

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
  to: [closeModal, clearStore],
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
