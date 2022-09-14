import { SubscriberStatisticsFilter } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.types';

export type ExportSubscribersConsumptionPayload = {
  params: SubscriberStatisticsFilter;
  fileName: string;
};
