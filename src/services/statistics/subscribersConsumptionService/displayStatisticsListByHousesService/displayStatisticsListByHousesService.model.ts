import { combine, createDomain, sample } from 'effector';
import { prepareFilterBeforeSenging } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.utils';
import { SubscriberStatisticsForm } from '../displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';
import {
  fetchHousingStockId,
  fetchStatisticsByHouse,
} from './displayStatisticsListByHousesService.api';
import { SubscriberStatisticsFilter } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.types';
import { SubscriberStatisticsСonsumptionResponse } from 'api/myApi';
import { HousingStockAddressForm } from './displayStatisticsListByHousesService.types';

const domain = createDomain('displayStatisticsListByHousesService');

const setHousingStockAddress =
  domain.createEvent<Partial<HousingStockAddressForm>>();
const $housingStockAddress = domain
  .createStore<Partial<HousingStockAddressForm>>({})
  .on(setHousingStockAddress, (_, address) => address);

const getHousingStockIdFx = domain.createEffect<
  HousingStockAddressForm,
  number | null
>(fetchHousingStockId);
const $selectedHousingStockId = domain
  .createStore<number | null>(null)
  .on(getHousingStockIdFx.doneData, (_, id) => id);

const getConsumptionStatisticsByHouseFx = domain.createEffect<
  SubscriberStatisticsFilter,
  SubscriberStatisticsСonsumptionResponse[]
>(fetchStatisticsByHouse);
const $consumptionStatisticsByHouse = domain
  .createStore<SubscriberStatisticsСonsumptionResponse[]>([])
  .on(
    getConsumptionStatisticsByHouseFx.doneData,
    (_, statistics) => statistics,
  );

const setSubscriberStatisticsFilter =
  domain.createEvent<SubscriberStatisticsForm>();
const $subscriberStatisticsByHouseFilter = domain
  .createStore<SubscriberStatisticsForm | null>(null)
  .on(setSubscriberStatisticsFilter, (_, filter) => filter);

const $isLoading = getConsumptionStatisticsByHouseFx.pending;

sample({
  clock: combine(
    $selectedHousingStockId,
    $subscriberStatisticsByHouseFilter,
    (HousingStockId, filter) => {
      if (!HousingStockId) {
        return null;
      }
      if (!filter) {
        return { HousingStockId };
      }
      const preparedData = prepareFilterBeforeSenging({
        ...filter,
        HousingStockId,
      });
      return { ...preparedData };
    },
  ),
  filter: Boolean,
  target: getConsumptionStatisticsByHouseFx,
});

sample({
  clock: $housingStockAddress,
  filter: (address): address is HousingStockAddressForm =>
    Boolean(address.City && address.Street && address.BuildingNumber),
  target: getHousingStockIdFx,
});

export const displayStatisticsListByHousesService = {
  inputs: {
    setSubscriberStatisticsFilter,
    setHousingStockAddress,
  },
  outputs: {
    $subscriberStatisticsByHouseFilter,
    $isLoading,
    $consumptionStatisticsByHouse,
    $selectedHousingStockId,
    $housingStockAddress,
  },
};
