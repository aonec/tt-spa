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
  GetHouseManagementsRequestPayload,
  SoiReportType,
} from './soiReportService.types';
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { BlobResponseErrorType } from 'types';
import { message } from 'antd';
import { GetAddressesWithCityRequestPayload } from '01/features/settings/uniqueWorkingRangeService/uniqueWorkingRangeService.types';

const domain = createDomain('soiReportService');

const openSoiReportModal = domain.createEvent();

const closeSoiReportModal = domain.createEvent();

const createSoiReport = domain.createEvent<CreateSoiReportRequestPayload>();

const fetchHouseManagementFx = domain.createEffect<
  GetHouseManagementsRequestPayload,
  HouseManagementResponse[]
>(getHouseManagements);

const fetchAdressesFx = domain.createEffect<
  GetAddressesWithCityRequestPayload,
  StreetWithHousingStockNumbersResponsePagedList
>(getAdresses);

const createSoiReportFx = domain.createEffect<
  CreateSoiReportRequestPayload,
  void,
  BlobResponseErrorType
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

createSoiReportFx.failData.watch(async (error) => {
  const newErr = { ...error };

  if (newErr.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
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
    $existingCities,
    $selectedCity,
    $addressesPagedList,
    $isCreateReportLoading,
  },
};
