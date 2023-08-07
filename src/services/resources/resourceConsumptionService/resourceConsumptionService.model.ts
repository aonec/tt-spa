import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetSummaryHousingConsumptionsByResourcesResponse } from 'api/types';
import { initialSelectedGraphTypes } from './resourceConsumptionService.constants';
import {
  ConsumptionDataForTwoMonth,
  ConsumptionDataPayload,
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
} from './resourceConsumptionService.api';
import moment from 'moment';

const domain = createDomain('resourceConsumptionService');

const clearData = domain.createEvent();

const clearSummary = domain.createEvent();

const getSummaryConsumptions = domain.createEvent<ConsumptionDataPayload>();

const getSummaryHousingConsumptionsFx = domain.createEffect<
  ConsumptionDataPayload,
  GetSummaryHousingConsumptionsByResourcesResponse,
  EffectFailDataAxiosError
>(fetchSummaryHousingConsumptions); // общий расход сверху

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

const getAdditionalHousingConsumptionPlotFx = domain.createEffect<
  ConsumptionDataPayload,
  { housing: ResourceConsumptionWithNull[] },
  EffectFailDataAxiosError
>(fetchHousingConsumptionPlot); // одпу адрес для сравнения

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

const getAdditionalNormativeAndSubscriberConsumptionDataFx =
  domain.createEffect<
    ConsumptionDataPayload,
    {
      normative: ResourceConsumptionWithNull[];
      subscriber: ResourceConsumptionWithNull[];
    },
    EffectFailDataAxiosError
  >(fetchNormativeAndSubscriberConsumptionData); // норматив и абонентское адрес для сравнения

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
  })
  .on(getAdditionalHousingConsumptionPlotFx.doneData, (prev, data) => {
    const { housing } = data;
    if (!prev) {
      return { additionalAddress: { housing } };
    }
    return {
      ...prev,
      additionalAddress: {
        housing,
        normative: prev?.prevMonthData?.normative,
        subscriber: prev?.prevMonthData?.subscriber,
      },
    };
  })
  .on(
    getAdditionalNormativeAndSubscriberConsumptionDataFx.doneData,
    (prev, data) => {
      const { normative, subscriber } = data;
      if (!prev) {
        return { additionalAddress: { normative, subscriber } };
      }
      return {
        ...prev,
        additionalAddress: {
          housing: prev?.prevMonthData?.housing,
          normative,
          subscriber,
        },
      };
    },
  )
  .reset(clearData);

$housingConsumptionData.watch((data) => console.log(data));

const getAdditionalConsumptionData =
  domain.createEvent<ConsumptionDataPayload>();

const clearAdditionalAddressData = domain.createEvent();

const $isAdditionalAddressSelected = domain
  .createStore<boolean>(false)
  .on(getAdditionalConsumptionData, (_, data) => Boolean(data))
  .reset([clearAdditionalAddressData, clearData]);

const setSelectedGraphTypes =
  domain.createEvent<BooleanTypesOfResourceConsumptionGraphForTwoMonth>();
const $selectedGraphTypes = domain
  .createStore<BooleanTypesOfResourceConsumptionGraphForTwoMonth>(
    initialSelectedGraphTypes,
  )
  .on(setSelectedGraphTypes, (_, selected) => selected)
  .reset(clearData);

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

const $isSummaryLoading = getSummaryHousingConsumptionsFx.pending;
const $isHousingLoading = getHousingConsumptionPlotFx.pending;
const $isNormativeAndSubscriberLoading =
  getNormativeAndSubscriberConsumptionDataFx.pending;
const $isPrevHousingLoading = getPrevHousingConsumptionPlotFx.pending;
const $isPrevNormativeAndSubscriberLoading =
  getPrevNormativeAndSubscriberConsumptionDataFx.pending;

const $isLoadingFromApi = combine(
  $isExistingCitiesLoading,
  getAddressesFx.pending,
  (...loadings) => loadings.includes(true),
);

const $isLoading = domain
  .createStore(true)
  .on($isLoadingFromApi, (_, isLoading) => isLoading);

sample({
  clock: getSummaryConsumptions,
  target: getSummaryHousingConsumptionsFx,
});

sample({
  clock: getConsumptionData,
  target: [
    getHousingConsumptionPlotFx,
    getNormativeAndSubscriberConsumptionDataFx,
  ],
});

sample({
  clock: getAdditionalConsumptionData,
  target: [
    getAdditionalHousingConsumptionPlotFx,
    getAdditionalNormativeAndSubscriberConsumptionDataFx,
  ],
});

sample({
  clock: getConsumptionData,
  source: $isAdditionalAddressSelected,
  filter: (isAdditionalAddressSelected) => !isAdditionalAddressSelected,
  fn: (_, params) => {
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

forward({
  from: ResourceConsumptionGate.close,
  to: [clearData, clearAdditionalAddressData, clearSummary],
});

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
    $summaryConsumption,
    $isSummaryLoading,
    $isHousingLoading,
    $isNormativeAndSubscriberLoading,
    $isPrevHousingLoading,
    $isPrevNormativeAndSubscriberLoading,
    $isAdditionalAddressSelected,
  },
  gates: { ResourceConsumptionGate },
};
