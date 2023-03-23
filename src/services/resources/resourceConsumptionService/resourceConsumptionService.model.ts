import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetSummaryHousingConsumptionsByResourcesResponse } from 'myApi';
import {
  fetchConsumptionsForMonth,
  fetchConsumptionsForTwoMonth,
  fetchSummaryConsumption,
} from './resourceConsumptionService.api';
import { initialSelectedGraphTypes } from './resourceConsumptionService.constants';
import {
  ConsumptionDataFilter,
  ConsumptionDataForTwoMonth,
  MonthConsumptionData,
} from './resourceConsumptionService.types';
import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from './view/ResourceConsumptionProfile/ResourceConsumptionProfile.types';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('resourceConsumptionService');

const clearData = domain.createEvent();

const getConsumptionData = domain.createEvent<ConsumptionDataFilter>();

const getHousingConsumptionFx = domain.createEffect<
  ConsumptionDataFilter,
  ConsumptionDataForTwoMonth,
  EffectFailDataAxiosError
>(fetchConsumptionsForTwoMonth);

const $housingConsumptionData = domain
  .createStore<ConsumptionDataForTwoMonth | null>(null)
  .on(getHousingConsumptionFx.doneData, (_, data) => data)
  .reset(clearData);

const getAdditionalConsumptionData =
  domain.createEvent<ConsumptionDataFilter>();

const clearAdditionalAddressData = domain.createEvent();
const getAdditionalConsumptionFx = domain.createEffect<
  ConsumptionDataFilter,
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
const getSummaryConsumptionsFx = domain.createEffect<
  ConsumptionDataFilter,
  GetSummaryHousingConsumptionsByResourcesResponse
>(fetchSummaryConsumption);
const $summaryConsumption = domain
  .createStore<GetSummaryHousingConsumptionsByResourcesResponse | null>(null)
  .on(getSummaryConsumptionsFx.doneData, (_, consumptions) => consumptions)
  .on(clearData, () => ({
    consumptions: [],
  }))
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
  target: [getHousingConsumptionFx, getSummaryConsumptionsFx],
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
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const resourceConsumptionService = {
  inputs: {
    getConsumptionData,
    getAdditionalConsumptionData,
    clearData,
    clearSummary,
    setSelectedGraphTypes,
    clearAdditionalAddressData,
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
