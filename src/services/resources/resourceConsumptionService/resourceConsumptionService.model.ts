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

const domain = createDomain('resourceConsumptionService');

const clearData = domain.createEvent();

const getConsumptionData = domain.createEvent<ConsumptionDataPayload>();

const getSummaryHousingConsumptionsFx = domain.createEffect<
  ConsumptionDataPayload,
  GetSummaryHousingConsumptionsByResourcesResponse,
  EffectFailDataAxiosError
>(fetchSummaryHousingConsumptions); // общий расход сверху

const getHousingConsumptionPlotFx = domain.createEffect<
  ConsumptionDataPayload,
  { housing: ResourceConsumptionWithNull[] },
  EffectFailDataAxiosError
>(fetchHousingConsumptionPlot); // одпу

const getNormativeAndSubscriberConsumptionDataFx = domain.createEffect<
  ConsumptionDataPayload,
  {
    normative: ResourceConsumptionWithNull[];
    subscriber: ResourceConsumptionWithNull[];
  },
  EffectFailDataAxiosError
>(fetchNormativeAndSubscriberConsumptionData); // норматив и абонентское

// const getHousingConsumptionFx = domain.createEffect<
//   ConsumptionDataPayload,
//   ConsumptionDataForTwoMonth,
//   EffectFailDataAxiosError
// >(fetchConsumptionsForTwoMonth);

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

  .reset(clearData);

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

$additionalConsumption.watch((data) => console.log(data));

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
const getSummaryConsumptionsFx = domain.createEffect<
  ConsumptionDataPayload,
  GetSummaryHousingConsumptionsByResourcesResponse
>(fetchSummaryConsumption);
const $summaryConsumption = domain
  .createStore<GetSummaryHousingConsumptionsByResourcesResponse | null>(null)
  .on(getSummaryConsumptionsFx.doneData, (_, consumptions) => consumptions)
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

// sample({
//   clock: getConsumptionData,
//   target: getHousingConsumptionFx,
// });
sample({
  clock: getConsumptionData,
  target: [
    getHousingConsumptionPlotFx,
    getNormativeAndSubscriberConsumptionDataFx,
  ],
});

// sample({
//   clock: getSummaryConsumptions,
//   target: getSummaryConsumptionsFx,
// });
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
