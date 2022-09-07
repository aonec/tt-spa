import { SubscriberStatisticsForm } from '../../displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';

export type SubscribersConsumptionExtendedSearchProps = {
  values: SubscriberStatisticsForm;
  setFieldValue: (
    name: string,
    value?: number | null | boolean | string
  ) => void;
};
