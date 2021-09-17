import { getReadingsHistory } from './../../../../_api/readings';
import {
  ReadingHistoryGate,
  fetchReadingHistoryFx,
  $readingHistory,
  refetchReadingHistory,
} from './index';
import { forward } from 'effector';

fetchReadingHistoryFx.use(getReadingsHistory);

$readingHistory
  .on(fetchReadingHistoryFx.doneData, (_, historyData) => historyData)
  .reset(ReadingHistoryGate.close);

forward({
  from: ReadingHistoryGate.open.map(({ deviceId }) => deviceId),
  to: fetchReadingHistoryFx,
});

forward({
  from: refetchReadingHistory,
  to: fetchReadingHistoryFx,
});
