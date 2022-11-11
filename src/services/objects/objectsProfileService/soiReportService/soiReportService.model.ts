import { combine, createDomain, guard, sample } from 'effector';
import {
  HouseManagementResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import { getAdresses, getHouseManagements } from './soiReportService.api';
import {
  GetAddressesRequestPayload,
  GetHouseManagementsRequestPayload,
  SoiReportType,
} from './soiReportService.model.types';
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';

const domain = createDomain('soiReportService');

const openSoiReportModal = domain.createEvent();

const closeSoiReportModal = domain.createEvent();

const fetchHouseManagementFx = domain.createEffect<
  GetHouseManagementsRequestPayload,
  HouseManagementResponse[]
>(getHouseManagements);

const fetchAdressesFx = domain.createEffect<
  GetAddressesRequestPayload,
  StreetWithHousingStockNumbersResponsePagedList
>(getAdresses);

const $addressesPagedList = domain
  .createStore<StreetWithHousingStockNumbersResponsePagedList | null>(null)
  .on(fetchAdressesFx.doneData, (_, data) => data)
  .reset(closeSoiReportModal);

const $houseManagements = domain
  .createStore<HouseManagementResponse[] | null>(null)
  .on(fetchHouseManagementFx.doneData, (_, list) => list)
  .reset(closeSoiReportModal);

const $isModalOpen = domain
  .createStore(false)
  .on(openSoiReportModal, () => true)
  .reset(closeSoiReportModal);

const setSoiReportType = domain.createEvent<SoiReportType>();

const $soiReportType = domain
  .createStore<SoiReportType | null>(null)
  .on(setSoiReportType, (_, type) => type)
  .reset(closeSoiReportModal);

const setSelectedCity = domain.createEvent<string>();

const $selectedCity = domain
  .createStore<string | null>(null)
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

export const soiReportService = {
  inputs: {
    openSoiReportModal,
    closeSoiReportModal,
    setSoiReportType,
    setSelectedCity,
  },
  outputs: {
    $isModalOpen,
    $soiReportType,
    $houseManagements,
    $existingCities,
    $selectedCity,
    $addressesPagedList,
  },
};
