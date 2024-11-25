import { IndividualDeviceReadingsItemHistoryResponse } from 'api/types';
import dayjs from 'dayjs';

export function getLatestUploadTimeItem(
  items: IndividualDeviceReadingsItemHistoryResponse[],
): IndividualDeviceReadingsItemHistoryResponse {
  return items.reduce((latestItem, currentItem) => {
    if (dayjs(currentItem.uploadTime).isAfter(dayjs(latestItem.uploadTime))) {
      return currentItem;
    }
    return latestItem;
  });
}
