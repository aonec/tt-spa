import { createEffect, createEvent, createStore } from 'effector';
import { combine, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import dayjs from 'api/dayjs';
import { isEmpty } from 'lodash';
import axios, { CancelTokenSource } from 'axios';
import { GetSummaryHousingConsumptionsByResourcesResponse } from 'api/types';
import { initialSelectedGraphTypes } from './resourceConsumptionService.constants';
import {
  CancelTokens,
  ConsumptionDataForTwoMonth,
  ConsumptionDataPayload,
  ConsumptionRequestPayload,
  ResourceConsumptionCancelToken,
  ResourceConsumptionGraphDataType,
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
import {
  getIsOnlyHousingDataEmpty,
  prepareDataForMinMaxCalculation,
  setConsumptionData,
} from './resourceConsumptionService.utils';
import { getMinAndMaxForResourceConsumptionGraph } from './view/ResourceConsumptionGraph/ResourceConsumptionGraph.utils';

const clearData = createEvent();

const clearSummary = createEvent();

const getSummaryConsumptions = createEvent<ConsumptionDataPayload>();
/**
 * общий расход (сверху)
 */
const getSummaryHousingConsumptionsFx = createEffect<
  ConsumptionRequestPayload,
  GetSummaryHousingConsumptionsByResourcesResponse,
  EffectFailDataAxiosError
>(fetchSummaryHousingConsumptions);

const getConsumptionData = createEvent<ConsumptionDataPayload>();
/**
 * одпу
 */
const getHousingConsumptionPlotFx = createEffect<
  ConsumptionRequestPayload,
  { housing: ResourceConsumptionWithNull[] },
  EffectFailDataAxiosError
>(fetchHousingConsumptionPlot);

/**
 * одпу потребление за прошлый период
 */
const getPrevHousingConsumptionPlotFx = createEffect<
  ConsumptionRequestPayload,
  { housing: ResourceConsumptionWithNull[] },
  EffectFailDataAxiosError
>(fetchHousingConsumptionPlot);

/**
 * одпу потребление адрес для сравнения
 */
const getAdditionalHousingConsumptionPlotFx = createEffect<
  ConsumptionRequestPayload,
  { housing: ResourceConsumptionWithNull[] },
  EffectFailDataAxiosError
>(fetchHousingConsumptionPlot); // одпу адрес для сравнения

/**
 * нормативное и абонентское потребление
 */
const getNormativeAndSubscriberConsumptionDataFx = createEffect<
  ConsumptionRequestPayload,
  {
    normative: ResourceConsumptionWithNull[];
    subscriber: ResourceConsumptionWithNull[];
  },
  EffectFailDataAxiosError
>(fetchNormativeAndSubscriberConsumptionData);

/**
 * нормативное и абонентское потребление за прошлый период
 */
const getPrevNormativeAndSubscriberConsumptionDataFx = createEffect<
  ConsumptionRequestPayload,
  {
    normative: ResourceConsumptionWithNull[];
    subscriber: ResourceConsumptionWithNull[];
  },
  EffectFailDataAxiosError
>(fetchNormativeAndSubscriberConsumptionData);

/**
 * нормативное и абонентское потребление адрес для сравнения
 */
const getAdditionalNormativeAndSubscriberConsumptionDataFx = createEffect<
  ConsumptionRequestPayload,
  {
    normative: ResourceConsumptionWithNull[];
    subscriber: ResourceConsumptionWithNull[];
  },
  EffectFailDataAxiosError
>(fetchNormativeAndSubscriberConsumptionData);

const $housingConsumptionData = createStore<ConsumptionDataForTwoMonth | null>(
  null,
)
  .on(getPrevHousingConsumptionPlotFx.doneData, (prev, data) =>
    setConsumptionData(
      prev,
      ResourceConsumptionGraphDataType.prevMonthData,
      data,
    ),
  )
  .on(getPrevNormativeAndSubscriberConsumptionDataFx.doneData, (prev, data) =>
    setConsumptionData(
      prev,
      ResourceConsumptionGraphDataType.prevMonthData,
      data,
    ),
  )
  .on(getHousingConsumptionPlotFx.doneData, (prev, data) =>
    setConsumptionData(
      prev,
      ResourceConsumptionGraphDataType.currentMonthData,
      data,
    ),
  )
  .on(getNormativeAndSubscriberConsumptionDataFx.doneData, (prev, data) =>
    setConsumptionData(
      prev,
      ResourceConsumptionGraphDataType.currentMonthData,
      data,
    ),
  )
  .on(getAdditionalHousingConsumptionPlotFx.doneData, (prev, data) =>
    setConsumptionData(
      prev,
      ResourceConsumptionGraphDataType.additionalAddress,
      data,
    ),
  )
  .on(
    getAdditionalNormativeAndSubscriberConsumptionDataFx.doneData,
    (prev, data) =>
      setConsumptionData(
        prev,
        ResourceConsumptionGraphDataType.additionalAddress,
        data,
      ),
  )
  .reset([clearData, getConsumptionData]);

const getAdditionalConsumptionData = createEvent<ConsumptionDataPayload>();

const clearAdditionalAddressData = createEvent();

const $isAdditionalAddressSelected = createStore<boolean>(false)
  .on(getAdditionalConsumptionData, (_, data) => Boolean(data))
  .reset([clearAdditionalAddressData, clearData]);

const setSelectedGraphTypes =
  createEvent<BooleanTypesOfResourceConsumptionGraphForTwoMonth>();
const $selectedGraphTypes =
  createStore<BooleanTypesOfResourceConsumptionGraphForTwoMonth>(
    initialSelectedGraphTypes,
  )
    .on(setSelectedGraphTypes, (_, selected) => selected)
    .reset(clearData);

const $dataForMinMaxCalculation = combine(
  $housingConsumptionData,
  $selectedGraphTypes,
  prepareDataForMinMaxCalculation,
);

const $dynamicMinMax = createStore<[number, number]>([0, 0]);

const $isOnlyHousingDataEmpty = $housingConsumptionData.map(
  getIsOnlyHousingDataEmpty,
);

const $summaryConsumption =
  createStore<GetSummaryHousingConsumptionsByResourcesResponse | null>(null)
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

const $isLoading = createStore(true).on(
  $isLoadingFromApi,
  (_, isLoading) => isLoading,
);

const cancelPrevMonthRequests = createEvent<{
  token: CancelTokenSource;
}>();
const cancelAdditionalRequests = createEvent<{
  token: CancelTokenSource;
}>();
const cancelMainRequests = createEvent<{
  token: CancelTokenSource;
}>();
const cancelSummaryRequests = createEvent<{
  token: CancelTokenSource;
}>();
const setToken = createEvent<{
  token: CancelTokenSource;
  type: ResourceConsumptionCancelToken;
}>();

createStore<CancelTokens>({}).on(
  setToken,
  (tokens, { token: newToken, type }) => {
    const oldToken = tokens[type];
    if (oldToken) {
      oldToken.cancel();
    }
    return { ...tokens, [type]: newToken };
  },
);

sample({
  clock: getSummaryConsumptions,
  fn: (params) => ({ params, token: axios.CancelToken.source() }),
  target: [getSummaryHousingConsumptionsFx, cancelSummaryRequests],
});

sample({
  clock: getConsumptionData,
  fn: (params) => ({ params, token: axios.CancelToken.source() }),
  target: [
    getHousingConsumptionPlotFx,
    getNormativeAndSubscriberConsumptionDataFx,
    cancelMainRequests,
  ],
});

sample({
  clock: getAdditionalConsumptionData,
  fn: (params) => ({ params, token: axios.CancelToken.source() }),
  target: [
    getAdditionalHousingConsumptionPlotFx,
    getAdditionalNormativeAndSubscriberConsumptionDataFx,
    cancelAdditionalRequests,
  ],
});

sample({
  clock: getConsumptionData,
  source: $isAdditionalAddressSelected,
  filter: (isAdditionalAddressSelected) => !isAdditionalAddressSelected,
  fn: (_, params) => {
    const prevMonth = dayjs(params.From).subtract(1, 'month');
    const paramsForPrevMonthRequest = {
      ...params,
      From: prevMonth.startOf('month').utcOffset(0, true).format(),
      To: prevMonth.endOf('month').utcOffset(0, true).format(),
    };
    return {
      params: paramsForPrevMonthRequest,
      token: axios.CancelToken.source(),
    };
  },
  target: [
    getPrevHousingConsumptionPlotFx,
    getPrevNormativeAndSubscriberConsumptionDataFx,
    cancelPrevMonthRequests,
  ],
});

sample({
  source: $dynamicMinMax,
  clock: $dataForMinMaxCalculation,
  filter: (_, dataForMinMaxCalculation) => {
    const isHaveDataForMinMaxCalculation = !isEmpty(
      dataForMinMaxCalculation?.flat(),
    );
    return isHaveDataForMinMaxCalculation;
  },
  fn: (dynamicMinMax, dataForMinMaxCalculation) => {
    const { minValue, maxValue } = getMinAndMaxForResourceConsumptionGraph(
      dataForMinMaxCalculation,
    );

    const isMaxValueChange = dynamicMinMax[1] !== maxValue;
    return isMaxValueChange
      ? ([minValue, maxValue] as [number, number])
      : dynamicMinMax;
  },
  target: $dynamicMinMax,
});

forward({
  from: ResourceConsumptionGate.close,
  to: [clearData, clearAdditionalAddressData, clearSummary],
});

sample({
  clock: cancelAdditionalRequests,
  fn: ({ token }) => ({
    token,
    type: ResourceConsumptionCancelToken.additionalAddress,
  }),
  target: setToken,
});

sample({
  clock: cancelMainRequests,
  fn: ({ token }) => ({
    token,
    type: ResourceConsumptionCancelToken.currentMonthData,
  }),
  target: setToken,
});

sample({
  clock: cancelPrevMonthRequests,
  fn: ({ token }) => ({
    token,
    type: ResourceConsumptionCancelToken.prevMonthData,
  }),
  target: setToken,
});

sample({
  clock: cancelSummaryRequests,
  fn: ({ token }) => ({
    token,
    type: ResourceConsumptionCancelToken.summary,
  }),
  target: setToken,
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
    $dynamicMinMax,
    $isOnlyHousingDataEmpty,
  },
  gates: { ResourceConsumptionGate },
};
