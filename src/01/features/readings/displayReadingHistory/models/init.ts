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
import { forward } from 'effector';

fetchReadingHistoryFx.use(getReadingsHistory);

$readingHistory
  .on(fetchReadingHistoryFx.doneData, (_, historyData) => historyData)
  .reset(ReadingHistoryGate.close);

forward({
  from: ReadingHistoryGate.state.map(({ deviceId }) => deviceId),
  to: fetchReadingHistoryFx,
});

forward({
  from: refetchReadingHistory,
  to: fetchReadingHistoryFx,
});

$readingsHistoryModalDeviceId
  .on(openReadingsHistoryModal, (_, deviceId) => deviceId)
  .reset(closeReadingsHistoryModal);
