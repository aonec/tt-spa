import dayjs from 'dayjs';
import { HistoryMonthReadingType } from 'services/meters/metersService/AccountingNodesReadingsService/AccountingNodesReadingsService.types';

export function getLatestUploadTimeItem(
  items: HistoryMonthReadingType[],
): HistoryMonthReadingType {
  return items.reduce((latestItem, currentItem) => {
    if (dayjs(currentItem.uploadTime).isAfter(dayjs(latestItem.uploadTime))) {
      return currentItem;
    }
    return latestItem;
  });
}
