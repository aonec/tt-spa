import { SubscriberStatisticsFilter } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.types';
import { SubscriberStatisticsForm } from '../displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';

export type ExportSubscribersConsumptionPayload = {
  params: SubscriberStatisticsFilter;
  fileName: string;
};

export type ExportSubscribersConsumptionContainerProps = {
  filter: SubscriberStatisticsForm | null;
};
