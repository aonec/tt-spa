import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import { createForm } from 'effector-forms/dist';
import { SubscriberStatisticsForm } from '../displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';
import { getConsumptionStatistics } from '01/_api/consumptionStatistics';
import { prepareFilterBeforeSenging } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.utils';

export const $selectedHousingsStockId = createStore<number>(0);

export const $consumptionStatistics = createStore<
  SubscriberStatisticsСonsumptionResponse[] | null
>(null);

export const fetchConsumptionStatistics = createEffect<
  {
    HousingStockId: number;
    MonthOfLastTransmission?: string | null;
    HotWaterSupply?: boolean | null;
    ColdWaterSupply?: boolean | null;
    Electricity?: boolean | null;
  },
  SubscriberStatisticsСonsumptionResponse[]
>();

const resourceRangeInitValue = {
  from: null as number | null,
  to: null as number | null,
};

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
      const preparedData = prepareFilterBeforeSenging({
        ...filter,
        HousingStockId,
      });
      return { ...preparedData };
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
