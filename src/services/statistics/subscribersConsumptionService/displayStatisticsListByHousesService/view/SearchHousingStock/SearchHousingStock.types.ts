import { SubscriberStatisticsForm } from 'services/statistics/subscribersConsumptionService/displayStatisticsListByManagingFirmService/view/ManagingFirmSearch/ManagingFirmSearch.types';
import { HousingStockAddressForm } from '../../displayStatisticsListByHousesService.types';

export type SearchHousingStockProps = {
  filter: SubscriberStatisticsForm | null;
  setFilter: (filter: SubscriberStatisticsForm) => void;
  housingStockAddress: Partial<HousingStockAddressForm>;
  setHousingStockAddress: (address: HousingStockAddressForm) => void;
  isNothingFound: boolean;
};
