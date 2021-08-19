import { getReadingsHistory } from './../../../../_api/readings';
import {
  ReadingHistoryGate,
  fetchReadingHistoryFx,
  $readingHistory,
} from './index';
import { forward } from 'effector';

fetchReadingHistoryFx.use(getReadingsHistory);

$readingHistory.on(
  fetchReadingHistoryFx.doneData,
  (_, historyData) => historyData
);

forward({
  from: ReadingHistoryGate.open.map(({ deviceId }) => deviceId),
  to: fetchReadingHistoryFx,
});
