import {
  combine,
  createEffect,
  createEvent,
  createStore,
  guard,
  sample,
} from 'effector';
import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import { createForm } from 'effector-forms/dist';
import { SubscriberStatisticsFilter } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.types';
import { SubscriberStatisticsForm } from '../displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';
import { getConsumptionStatistics } from '01/_api/consumptionStatistics';

export const $selectedHousingsStockId = createStore<number>(0);

const fetchConsumptionStatistics = createEffect<
  SubscriberStatisticsFilter,
  SubscriberStatisticsСonsumptionResponse[]
>(getConsumptionStatistics);

export const $consumptionStatistics = createStore<
  SubscriberStatisticsСonsumptionResponse[]
>([]).on(fetchConsumptionStatistics.doneData, (_, statistics) => statistics);

export const setSelectedHousingStockId = createEvent<number>();

export const subscribersConsumptionFindForm = createForm({
  fields: {
    city: { init: '' },
    street: { init: '' },
    house: { init: '' },
  },
});

const setSubscriberStatisticsFilter = createEvent<SubscriberStatisticsForm>();
const $subscriberStatisticsFilter = createStore<SubscriberStatisticsForm | null>(
  null
).on(setSubscriberStatisticsFilter, (_, filter) => filter);

const $isLoading = fetchConsumptionStatistics.pending;

sample({
  clock: combine(
    $selectedHousingsStockId,
    $subscriberStatisticsFilter,
    (HousingStockId, filter) => {
      if (!filter) {
        return { HousingStockId };
      }
      return { ...filter, HousingStockId };
    }
  ),
  target: fetchConsumptionStatistics,
});

export const subscribersConsumptionService = {
  inputs: {
    setSubscriberStatisticsFilter,
  },
  outputs: {
    $subscriberStatisticsFilter,
    $isLoading,
  },
};
