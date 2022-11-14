import { combine, createDomain, forward, guard, sample } from 'effector';
import {
  HouseManagementResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  getAdresses,
  getHouseManagements,
  getSoiReport,
} from './soiReportService.api';
import {
  CreateSoiReportRequestPayload,
  GetAddressesRequestPayload,
  GetHouseManagementsRequestPayload,
  SoiReportType,
} from './soiReportService.model.types';
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('soiReportService');

const openSoiReportModal = domain.createEvent();

const closeSoiReportModal = domain.createEvent();

const createSoiReport = domain.createEvent<CreateSoiReportRequestPayload>();

const fetchHouseManagementFx = domain.createEffect<
  GetHouseManagementsRequestPayload,
  HouseManagementResponse[]
>(getHouseManagements);

const fetchAdressesFx = domain.createEffect<
  GetAddressesRequestPayload,
  StreetWithHousingStockNumbersResponsePagedList
>(getAdresses);

const createSoiReportFx = domain.createEffect<
  CreateSoiReportRequestPayload,
  void,
  EffectFailDataAxiosError
>(getSoiReport);

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

forward({
  from: createSoiReport,
  to: createSoiReportFx,
});

createSoiReportFx.failData.watch((e) =>
  message.error(e.response.data.error.Text)
);

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
    $existingCities,
    $selectedCity,
    $addressesPagedList,
    $isCreateReportLoading,
  },
};
