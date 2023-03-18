import { GuidStringDictionaryItem } from 'myApi';
import { SubscriberStatisticsFilter } from '../../displayStatisticsListByManagingFirmService.types';

export type ManagingFirmSearchProps = {
  cities: string[];
  selectedCity: string;
  selectCity: (city: string) => void;
  managingFirms: GuidStringDictionaryItem[];
  selectManagingFirm: (managingFirm: string) => void;
  selectedManagingFirm: string;
  setFilter: (filter: SubscriberStatisticsForm) => void;
  filter: SubscriberStatisticsForm | null;
  managingFirmsLoading: boolean;
};

export type SubscriberStatisticsForm = Omit<
  SubscriberStatisticsFilter,
  'HousingStockId'
>;

export type SubscriberStatisticsFormik = SubscriberStatisticsForm & {
  ExcludeApartments: boolean;
};
