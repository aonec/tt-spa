import { createEffect, createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { sample, combine } from 'effector';
import { IndividualDeviceReadingsHistoryResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService';
import { getReadingsHistory } from './readingsHistoryService.api';

const ReadingHistoryGate = createGate<{ deviceId: number }>();

const fetchReadingHistoryFx = createEffect<
  number,
  IndividualDeviceReadingsHistoryResponse,
  EffectFailDataAxiosError
>(getReadingsHistory);

const refetchReadingHistory = createEvent<number>();

const openReadingsHistoryModal = createEvent<number>();
const closeReadingsHistoryModal = createEvent();

const $readingsHistoryModalDeviceId = createStore<number | null>(null)
  .on(openReadingsHistoryModal, (_, deviceId) => deviceId)
  .reset(closeReadingsHistoryModal);

const $isReadingsHstoryModalOpen = $readingsHistoryModalDeviceId.map(Boolean);

const $readingHistory =
  createStore<IndividualDeviceReadingsHistoryResponse | null>(null)
    .on(fetchReadingHistoryFx.doneData, (_, historyData) => historyData)
    .reset(ReadingHistoryGate.close);

const $devuceId = ReadingHistoryGate.state.map(
  (value) => value.deviceId || null,
);

sample({
  clock: $devuceId,
  filter: Boolean,
  target: fetchReadingHistoryFx,
});

sample({
  clock: refetchReadingHistory,
  source: $devuceId,
  filter: Boolean,
  target: fetchReadingHistoryFx,
});

const $isReadingsHistoryLoading = combine(
  fetchReadingHistoryFx.pending,
  $readingHistory,
  (isLoading, history) => isLoading && !history,
);

export const readingsHistoryService = {
  inputs: {
    openReadingsHistoryModal,
    refetchReadingHistory,
    closeReadingsHistoryModal,
  },
  outputs: {
    $isReadingsHstoryModalOpen,
    $readingsHistoryModalDeviceId,
    $readingHistory,
    $isReadingsHistoryLoading,
    $individualDevice:
      displayIndividualDeviceAndNamesService.outputs.$individualDevice,
  },
  gates: {
    ReadingHistoryGate,
    IndividualDeviceGate:
      displayIndividualDeviceAndNamesService.gates.IndividualDeviceGate,
  },
};
