import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { message } from 'antd';
import {
  GetDataForHousingConsumptionPlotResponse,
  GetDataForIndividualDevicesConsumptionPlotResponse,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'api/types';
import {
  fetchConsumptionsForMonth,
  fetchConsumptionsForTwoMonth,
  fetchSummaryConsumption,
} from './resourceConsumptionService.api';
import { initialSelectedGraphTypes } from './resourceConsumptionService.constants';
import {
  ConsumptionDataForTwoMonth,
  ConsumptionDataPayload,
  MonthConsumptionData,
  ResourceConsumptionWithNull,
} from './resourceConsumptionService.types';
import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from './view/ResourceConsumptionProfile/ResourceConsumptionProfile.types';
import { EffectFailDataAxiosError } from 'types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { getAddressesFx } from './resourceConsumptionFilterService/resourceConsumptionFilterService.api';
import {
  fetchHousingConsumptionPlot,
  fetchNormativeAndSubscriberConsumptionData,
  fetchSummaryHousingConsumptions,
} from './resourceConsumptionService.api2';
import moment from 'moment';

const domain = createDomain('resourceConsumptionService');

const clearData = domain.createEvent();

const getConsumptionData = domain.createEvent<ConsumptionDataPayload>();

const getHousingConsumptionPlotFx = domain.createEffect<
  ConsumptionDataPayload,
  { housing: ResourceConsumptionWithNull[] },
  EffectFailDataAxiosError
>(fetchHousingConsumptionPlot); // одпу

const getPrevHousingConsumptionPlotFx = domain.createEffect<
  ConsumptionDataPayload,
  { housing: ResourceConsumptionWithNull[] },
  EffectFailDataAxiosError
>(fetchHousingConsumptionPlot); // одпу за прошлый период

const getNormativeAndSubscriberConsumptionDataFx = domain.createEffect<
  ConsumptionDataPayload,
  {
    normative: ResourceConsumptionWithNull[];
    subscriber: ResourceConsumptionWithNull[];
  },
  EffectFailDataAxiosError
>(fetchNormativeAndSubscriberConsumptionData); // норматив и абонентское

const getPrevNormativeAndSubscriberConsumptionDataFx = domain.createEffect<
  ConsumptionDataPayload,
  {
    normative: ResourceConsumptionWithNull[];
    subscriber: ResourceConsumptionWithNull[];
  },
  EffectFailDataAxiosError
>(fetchNormativeAndSubscriberConsumptionData); // норматив и абонентское за прошлый период

const $housingConsumptionData = domain
  .createStore<ConsumptionDataForTwoMonth | null>(null)
  .on(getHousingConsumptionPlotFx.doneData, (prev, data) => {
    const { housing } = data;
    if (!prev) {
      return { currentMonthData: { housing } };
    }
    return {
      ...prev,
      currentMonthData: {
        housing,
        normative: prev?.currentMonthData?.normative,
        subscriber: prev?.currentMonthData?.subscriber,
      },
    };
  })
  .on(getPrevHousingConsumptionPlotFx.doneData, (prev, data) => {
    const { housing } = data;
    if (!prev) {
      return { prevMonthData: { housing } };
    }
    return {
      ...prev,
      prevMonthData: {
        housing,
        normative: prev?.prevMonthData?.normative,
        subscriber: prev?.prevMonthData?.subscriber,
      },
    };
  })
  .on(getNormativeAndSubscriberConsumptionDataFx.doneData, (prev, data) => {
    const { normative, subscriber } = data;
    if (!prev) {
      return { currentMonthData: { normative, subscriber } };
    }
    return {
      ...prev,
      currentMonthData: {
        housing: prev?.currentMonthData?.housing,
        normative,
        subscriber,
      },
    };
  })
  .on(getPrevNormativeAndSubscriberConsumptionDataFx.doneData, (prev, data) => {
    const { normative, subscriber } = data;
    if (!prev) {
      return { prevMonthData: { normative, subscriber } };
    }
    return {
      ...prev,
      prevMonthData: {
        housing: prev?.prevMonthData?.housing,
        normative,
        subscriber,
      },
    };
  });
// .reset(clearData);

const getAdditionalConsumptionData =
  domain.createEvent<ConsumptionDataPayload>();

const clearAdditionalAddressData = domain.createEvent();
const getAdditionalConsumptionFx = domain.createEffect<
  ConsumptionDataPayload,
  MonthConsumptionData
>(fetchConsumptionsForMonth);
const $additionalConsumption = domain
  .createStore<MonthConsumptionData | null>(null)
  .on(getAdditionalConsumptionFx.doneData, (_, data) => data)
  .reset(clearAdditionalAddressData);

const setSelectedGraphTypes =
  domain.createEvent<BooleanTypesOfResourceConsumptionGraphForTwoMonth>();
const $selectedGraphTypes = domain
  .createStore<BooleanTypesOfResourceConsumptionGraphForTwoMonth>(
    initialSelectedGraphTypes,
  )
  .on(setSelectedGraphTypes, (_, selected) => selected)
  .reset(clearData);

const clearSummary = domain.createEvent();

const getSummaryConsumptions = domain.createEvent<ConsumptionDataPayload>();

const getSummaryHousingConsumptionsFx = domain.createEffect<
  ConsumptionDataPayload,
  GetSummaryHousingConsumptionsByResourcesResponse,
  EffectFailDataAxiosError
>(fetchSummaryHousingConsumptions); // общий расход сверху

const $summaryConsumption = domain
  .createStore<GetSummaryHousingConsumptionsByResourcesResponse | null>(null)
  .on(
    getSummaryHousingConsumptionsFx.doneData,
    (_, consumptions) => consumptions,
  )
  .reset(clearSummary);

const $isExistingCitiesLoading =
  addressSearchService.outputs.$isExistingCitiesLoading;

const ResourceConsumptionGate = createGate();

const $isLoading = combine(
  // getHousingConsumptionFx.pending,
  // getAdditionalConsumptionFx.pending,
  $isExistingCitiesLoading,
  getAddressesFx.pending,
  (...loadings) => loadings.includes(true),
);

// const $isLoading = domain
//   .createStore(true)
//   .on($isLoadingFromApi, (_, isLoading) => isLoading);

sample({
  clock: getAdditionalConsumptionData,
  target: getAdditionalConsumptionFx,
});

sample({
  clock: getConsumptionData,
  target: [
    getHousingConsumptionPlotFx,
    getNormativeAndSubscriberConsumptionDataFx,
  ],
});

sample({
  clock: getConsumptionData,
  fn: (params) => {
    const prevMonth = moment(params.From).subtract(1, 'month');
    const paramsForPrevMonthRequest = {
      ...params,
      From: prevMonth.startOf('month').utcOffset(0, true).format(),
      To: prevMonth.endOf('month').utcOffset(0, true).format(),
    };
    return paramsForPrevMonthRequest;
  },
  target: [
    getPrevHousingConsumptionPlotFx,
    getPrevNormativeAndSubscriberConsumptionDataFx,
  ],
});

sample({
  clock: getSummaryConsumptions,
  target: getSummaryHousingConsumptionsFx,
});

forward({
  from: ResourceConsumptionGate.close,
  to: [clearData, clearAdditionalAddressData, clearSummary],
});

// forward({
//   from: getHousingConsumptionFx.failData,
//   to: [clearData, clearAdditionalAddressData],
// });

// getHousingConsumptionFx.failData.watch((error) => {
//   const errorText =
//     error.response.data.error.Text ||
//     error.response.data.error.Message ||
//     'Произошла ошибка';

//   message.error(errorText);
// });

export const resourceConsumptionService = {
  inputs: {
    getConsumptionData,
    getAdditionalConsumptionData,
    clearData,
    clearSummary,
    setSelectedGraphTypes,
    clearAdditionalAddressData,
    getSummaryConsumptions,
  },
  outputs: {
    $housingConsumptionData,
    $isLoading,
    $selectedGraphTypes,
    $additionalConsumption,
    $summaryConsumption,
  },
  gates: { ResourceConsumptionGate },
};
