import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import {
  BuildingListResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import { TreeSelectElement } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.types';
import { prepareAddressesForTreeSelect } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.utils';
import {
  fetchAddresses,
  fetchDownloadHeatIndividualDeviceReport,
} from './heatIndividualDevicesReportService.api';
import { HeatIndividualDevicesReportPayload } from './heatIndividualDevicesReportService.types';

const clearStore = createEvent();

const openModal = createEvent<BuildingListResponse | void>();
const closeModal = createEvent();
const $isOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const downloadReportFx = createEffect<HeatIndividualDevicesReportPayload, void>(
  fetchDownloadHeatIndividualDeviceReport,
);
const downloadReport = createEvent<HeatIndividualDevicesReportPayload>();

const $isLoading = downloadReportFx.pending;

const $selectedBuilding = createStore<BuildingListResponse | null>(null)
  .on(openModal, (_, building) => building || null)
  .reset(closeModal);

const selectCity = createEvent<string>();
const $selectedCity = createStore<string | null>(null)
  .on(selectCity, (_, city) => city)
  .on(openModal, (prev, building) => {
    if (!building) return prev;

    return building.address?.mainAddress?.city || prev;
  })
  .reset(clearStore);

const getAddressesFx = createEffect<
  string,
  StreetWithBuildingNumbersResponsePagedList
>(fetchAddresses);

const $treeData = createStore<TreeSelectElement[]>([])
  .on(getAddressesFx.doneData, (_, data) =>
    prepareAddressesForTreeSelect({
      items: data.items || [],
      isTreeCheckable: true,
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

sample({
  clock: downloadReportFx.doneData,
  target: [closeModal, clearStore],
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
    $selectedBuilding,
  },
};
