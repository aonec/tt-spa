import { createEffect, createEvent, createStore } from 'effector';
import { combine, guard, sample } from 'effector';
import { message } from 'antd';
import {
  HouseManagementResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import {
  getAdresses,
  getHouseManagements,
  getSoiReport,
} from './soiReportService.api';
import {
  CreateSoiReportRequestPayload,
  GetHouseManagementsRequestPayload,
  SoiReportType,
} from './soiReportService.types';
import { BlobResponseErrorType } from 'types';
import { GetAddressesWithCityRequestPayload } from 'services/workingRanges/uniqueWorkingRangeService/uniqueWorkingRangeService.types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const openSoiReportModal = createEvent();

const closeSoiReportModal = createEvent();

const createSoiReport = createEvent<CreateSoiReportRequestPayload>();

const fetchHouseManagementFx = createEffect<
  GetHouseManagementsRequestPayload,
  HouseManagementResponse[]
>(getHouseManagements);

const fetchAdressesFx = createEffect<
  GetAddressesWithCityRequestPayload,
  StreetWithBuildingNumbersResponsePagedList
>(getAdresses);

const createSoiReportFx = createEffect<
  CreateSoiReportRequestPayload,
  void,
  BlobResponseErrorType
>(getSoiReport);

const $addressesPagedList =
  createStore<StreetWithBuildingNumbersResponsePagedList | null>(null)
    .on(fetchAdressesFx.doneData, (_, data) => data)
    .reset(closeSoiReportModal);

const $houseManagements = createStore<HouseManagementResponse[] | null>(null)
  .on(fetchHouseManagementFx.doneData, (_, list) => list)
  .reset(closeSoiReportModal);

const $isModalOpen = createStore(false)
  .on(openSoiReportModal, () => true)
  .reset(closeSoiReportModal);

const setSoiReportType = createEvent<SoiReportType>();

const $soiReportType = createStore<SoiReportType | null>(null)
  .on(setSoiReportType, (_, type) => type)
  .reset(closeSoiReportModal);

const setSelectedCity = createEvent<string>();

const $selectedCity = createStore<string | null>(null)
  .on(setSelectedCity, (_, city) => city)
  .reset(closeSoiReportModal);

sample({
  source: $selectedCity,
  clock: guard({
    clock: combine($soiReportType, $selectedCity),
    filter: ([type, seletedCity]) =>
      type === SoiReportType.HouseManagement && Boolean(seletedCity),
  }),
  fn: (selectedCity) => ({ City: selectedCity! }),
  target: fetchHouseManagementFx,
});

sample({
  source: $selectedCity,
  clock: guard({
    clock: combine($soiReportType, $selectedCity),
    filter: ([type, seletedCity]) =>
      type === SoiReportType.Address && Boolean(seletedCity),
  }),
  fn: (selectedCity) => ({ City: selectedCity! }),
  target: fetchAdressesFx,
});

sample({
  clock: createSoiReport,
  target: createSoiReportFx,
});

createSoiReportFx.failData.watch(async (error) => {
  const jsonData = await error.response.data.text();
  const errObject = JSON.parse(jsonData);

  return message.error(
    errObject.error.Text ||
      errObject.error.Message ||
      'Невозможно выгрузить отчёт',
  );
});

const $isCreateReportLoading = createSoiReportFx.pending;

export const soiReportService = {
  inputs: {
    openSoiReportModal,
    closeSoiReportModal,
    setSoiReportType,
    setSelectedCity,
    createSoiReport,
  },
  outputs: {
    $isModalOpen,
    $soiReportType,
    $houseManagements,
    $existingCities: addressSearchService.outputs.$existingCities,
    $selectedCity,
    $addressesPagedList,
    $isCreateReportLoading,
  },
};
