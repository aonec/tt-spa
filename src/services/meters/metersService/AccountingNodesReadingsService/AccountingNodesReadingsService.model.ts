import { createDomain, sample } from 'effector';
import {
  AccountingNodesSumReadings,
  GetElectricNodesByAddress,
  UpdateAccountingNodesSumPayload,
} from './AccountingNodesReadingsService.types';
import { createGate } from 'effector-react';
import { PREVIOUS_READING_INDEX_LIMIT } from './AccountingNodesReadingsService.constants';
import { round } from 'utils/round';
import { getElectricNodesQuery } from './AccountingNodesReadingsService.api';

const domain = createDomain('AccountingNodesReadingsService');

const HousingStockIdGate = createGate<{ id?: number }>();

const upSliderIndex = domain.createEvent();
const downSliderIndex = domain.createEvent();

const $sliderIndex = domain
  .createStore(0)
  .on(upSliderIndex, (index) => {
    if (index === PREVIOUS_READING_INDEX_LIMIT) return index;

    return ++index;
  })
  .on(downSliderIndex, (index) => {
    if (index === 0) return index;

    return --index;
  });

const fetchElectricNodes = domain.createEvent<GetElectricNodesByAddress>();

const $housingStockAddress = getElectricNodesQuery.$data.map((nodes) => {
  if (nodes?.length) {
    return nodes[0].address?.address?.mainAddress || null;
  }
  return null;
});

const updateNodeReadings =
  domain.createEvent<UpdateAccountingNodesSumPayload>();
const $readingsList = domain
  .createStore<AccountingNodesSumReadings>({})
  .on(
    updateNodeReadings,
    (readingsList, { id, currentReading, previousExistingReading }) => {
      readingsList[id] = { currentReading, previousExistingReading };

      return { ...readingsList };
    },
  )
  .reset(HousingStockIdGate.close);

const $sumOfReadings = $readingsList.map((readings) =>
  Object.values(readings).reduce((sum, currentReadings) => {
    const { previousExistingReading, currentReading } = currentReadings;
    const nonResidentialRoomConsumption =
      currentReading?.nonResidentialRoomConsumption || 0;

    if (!currentReading || !previousExistingReading) {
      return sum;
    }
    return round(
      sum +
        currentReading.value -
        previousExistingReading.value +
        nonResidentialRoomConsumption,
      3,
    );
  }, 0),
);

const $isLoading = getElectricNodesQuery.$pending;

sample({
  source: HousingStockIdGate.state.map(({ id }) => ({ BuildingId: id })),
  clock: sample({
    source: $housingStockAddress,
    clock: HousingStockIdGate.state,
    filter: (housingStock, { id }) =>
      Boolean(id && id !== housingStock?.housingStockId),
  }),
  target: getElectricNodesQuery.start,
});

sample({
  clock: fetchElectricNodes,
  target: getElectricNodesQuery.start,
});

sample({
  clock: HousingStockIdGate.close,
  target: getElectricNodesQuery.reset,
});

export const AccountingNodesReadingsService = {
  inputs: {
    fetchElectricNodes,
    upSliderIndex,
    downSliderIndex,
    updateNodeReadings,
  },
  outputs: {
    $housingStockAddress,
    $isLoading,
    $sliderIndex,
    $sumOfReadings,
  },
  gates: {
    HousingStockIdGate,
  },
};
