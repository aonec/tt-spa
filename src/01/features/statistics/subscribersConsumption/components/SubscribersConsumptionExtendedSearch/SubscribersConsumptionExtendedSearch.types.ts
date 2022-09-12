import { SubscriberStatisticsFormik } from '../../displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';

export type SubscribersConsumptionExtendedSearchProps = {
  values: SubscriberStatisticsFormik;
  setFieldValue: (
    name: string,
    value?: number | null | boolean | string
  ) => void;
};
