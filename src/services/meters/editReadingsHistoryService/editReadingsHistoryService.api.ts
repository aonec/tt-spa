import { axios } from '01/axios';
import { EditReadingsHistoryPayload } from './editReadingsHistoryService.types';

export const fetchEditReadingsHistory = ({
  deviceId,
  newReadings,
}: EditReadingsHistoryPayload): Promise<void> =>
  axios.post(`IndividualDevices/${deviceId}/editReadingsHistory`, {
    newReadings: [newReadings],
  });
