import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetSummaryHousingConsumptionsByResourcesResponse } from 'api/types';
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
} from './resourceConsumptionService.types';
import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from './view/ResourceConsumptionProfile/ResourceConsumptionProfile.types';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('resourceConsumptionService');

const clearData = domain.createEvent();

const getConsumptionData = domain.createEvent<ConsumptionDataPayload>();

const getHousingConsumptionFx = domain.createEffect<
  ConsumptionDataPayload,
  ConsumptionDataForTwoMonth,
  EffectFailDataAxiosError
>(fetchConsumptionsForTwoMonth);

const $housingConsumptionData = domain
  .createStore<ConsumptionDataForTwoMonth | null>(null)
  .on(getHousingConsumptionFx.doneData, (_, data) => data)
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

const ResourceConsumptionGate = createGate();

const $isLoading = combine(
  getHousingConsumptionFx.pending,
  getAdditionalConsumptionFx.pending,
  (...loadings) => loadings.includes(true),
);

sample({
  clock: getAdditionalConsumptionData,
  target: getAdditionalConsumptionFx,
});

sample({
  clock: getConsumptionData,
  target: getHousingConsumptionFx,
});

sample({
  clock: getSummaryConsumptions,
  target: getSummaryConsumptionsFx,
});

forward({
  from: ResourceConsumptionGate.close,
  to: [clearData, clearAdditionalAddressData, clearSummary],
});

forward({
  from: getHousingConsumptionFx.failData,
  to: [clearData, clearAdditionalAddressData],
});

getHousingConsumptionFx.failData.watch((error) => {
  const errorText =
    error.response?.data.error.Text || error.response?.data.error.Message;

  return errorText && message.error(errorText);
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
    $additionalConsumption,
    $summaryConsumption,
  },
  gates: { ResourceConsumptionGate },
};
