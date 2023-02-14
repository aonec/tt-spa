import { fetchIndividualDeviceFx } from '01/features/individualDevices/displayIndividualDevice/models';
import { getReadingsHistory } from './../../../../_api/readings';
import {
  ReadingHistoryGate,
  fetchReadingHistoryFx,
  $readingHistory,
  refetchReadingHistory,
  $readingsHistoryModalDeviceId,
  openReadingsHistoryModal,
  closeReadingsHistoryModal,
} from './index';
import { forward, sample } from 'effector';
import { refetchIndividualDevices } from '01/features/individualDevices/displayIndividualDevices/models';

fetchReadingHistoryFx.use(getReadingsHistory);

$readingHistory
  .on(fetchReadingHistoryFx.doneData, (_, historyData) => historyData)
  .reset(ReadingHistoryGate.close);

forward({
  from: ReadingHistoryGate.open.map(({ deviceId }) => deviceId),
  to: fetchReadingHistoryFx,
});

sample({
  clock: refetchReadingHistory,
  source: ReadingHistoryGate.state.map((value) => value.deviceId),
  target: fetchReadingHistoryFx,
});

$readingsHistoryModalDeviceId
  .on(openReadingsHistoryModal, (_, deviceId) => deviceId)
  .reset(closeReadingsHistoryModal);

forward({
  from: $readingsHistoryModalDeviceId as any,
  to: fetchIndividualDeviceFx,
});

forward({
  from: ReadingHistoryGate.close,
  to: refetchIndividualDevices,
});
