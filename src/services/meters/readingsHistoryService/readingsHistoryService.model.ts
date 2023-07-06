import { createGate } from 'effector-react';
import { sample, createDomain } from 'effector';
import { IndividualDeviceReadingsHistoryResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService';
import { apartmentIndividualDevicesMetersService } from '../apartmentIndividualDevicesMetersService';
import { getReadingsHistory } from './readingsHistoryService.api';

const domain = createDomain('readingsHistory');

const ReadingHistoryGate = createGate<{ deviceId: number }>();

const fetchReadingHistoryFx = domain.createEffect<
  number,
  IndividualDeviceReadingsHistoryResponse,
  EffectFailDataAxiosError
>(getReadingsHistory);

const refetchReadingHistory = domain.createEvent<number>();

const openReadingsHistoryModal = domain.createEvent<number>();
const closeReadingsHistoryModal = domain.createEvent();

const $readingsHistoryModalDeviceId = domain
  .createStore<number | null>(null)
  .on(openReadingsHistoryModal, (_, deviceId) => deviceId)
  .reset(closeReadingsHistoryModal);

const $isReadingsHstoryModalOpen = $readingsHistoryModalDeviceId.map(Boolean);

const $readingHistory = domain
  .createStore<IndividualDeviceReadingsHistoryResponse | null>(null)
  .on(fetchReadingHistoryFx.doneData, (_, historyData) => historyData)
  .reset(ReadingHistoryGate.close);

sample({
  clock: ReadingHistoryGate.open.map(({ deviceId }) => deviceId),
  target: fetchReadingHistoryFx,
});

sample({
  clock: refetchReadingHistory,
  source: ReadingHistoryGate.state.map((value) => value.deviceId),
  target: fetchReadingHistoryFx,
});

sample({
  source: $readingsHistoryModalDeviceId,
  filter: Boolean,
  target:
    displayIndividualDeviceAndNamesService.inputs.handleFetchIndividualDevice,
});

sample({
  clock: ReadingHistoryGate.close,
  target:
    apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
});

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
    fetchReadingHistoryFx,
  },
  gates: { ReadingHistoryGate },
};
