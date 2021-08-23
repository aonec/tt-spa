import { getReadingsHistory } from './../../../../_api/readings';
import {
  ReadingHistoryGate,
  fetchReadingHistoryFx,
  $readingHistory,
  refetchReadingHistory,
} from './index';
import { forward } from 'effector';
import { sample } from 'lodash';

fetchReadingHistoryFx.use(getReadingsHistory);

$readingHistory.on(
  fetchReadingHistoryFx.doneData,
  (_, historyData) => historyData
);

forward({
  from: ReadingHistoryGate.open.map(({ deviceId }) => deviceId),
  to: fetchReadingHistoryFx,
});

sample({
  source: ReadingHistoryGate.open.map(({ deviceId }) => deviceId),
  clock: refetchReadingHistory,
  target: fetchReadingHistoryFx,
});
