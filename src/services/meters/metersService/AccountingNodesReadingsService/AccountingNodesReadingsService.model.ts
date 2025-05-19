import { createEvent, createStore } from 'effector';
import { sample } from 'effector';
import {
  AccountingNodesSumReadings,
  GetElectricNodesByAddress,
  UpdateAccountingNodesSumPayload,
} from './AccountingNodesReadingsService.types';
import { createGate } from 'effector-react';
import { PREVIOUS_READING_INDEX_LIMIT } from './AccountingNodesReadingsService.constants';
import { round } from 'utils/round';
import {
  getBuildingQuery,
  getElectricNodesQuery,
} from './AccountingNodesReadingsService.api';

const HousingStockIdGate = createGate<{ id?: number }>();

const upSliderIndex = createEvent();
const downSliderIndex = createEvent();

const $sliderIndex = createStore(0)
  .on(upSliderIndex, (index) => {
    if (index === PREVIOUS_READING_INDEX_LIMIT) return index;

    return ++index;
  })
  .on(downSliderIndex, (index) => {
    if (index === 0) return index;

    return --index;
  });

const fetchElectricNodes = createEvent<GetElectricNodesByAddress>();

const $housingStockAddress = getBuildingQuery.$data.map((addressList) => {
  if (addressList?.length) {
    return addressList[0].address?.mainAddress || null;
  }
  return null;
});

const updateNodeReadings = createEvent<UpdateAccountingNodesSumPayload>();
const $readingsList = createStore<AccountingNodesSumReadings>({})
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

const handleOpenHistory = createEvent<number>();
const handleCloseHistory = createEvent();

const $deviceId = createStore<number | null>(null)
  .on(handleOpenHistory, (_, id) => id)
  .reset(handleCloseHistory);
const $isHistoryOpen = $deviceId.map(Boolean);

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
  target: [getElectricNodesQuery.start, getBuildingQuery.start],
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
    handleOpenHistory,
    handleCloseHistory,
  },
  outputs: {
    $housingStockAddress,
    $isLoading,
    $sliderIndex,
    $sumOfReadings,
    $deviceId,
    $isHistoryOpen,
  },
  gates: {
    HousingStockIdGate,
  },
};
