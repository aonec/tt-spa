import { SubscribersConsumptionSearchType } from 'services/statistics/subscribersConsumptionService/subscribersConsumptionService.types';
import { StatisticProfileGrouptype } from '../../statisticsProfileService.types';
import { HousingStockAddressForm } from 'services/statistics/subscribersConsumptionService/displayStatisticsListByHousesService/displayStatisticsListByHousesService.types';

export type StatisticProfileProps = {
  handleOpenExportStatisticModal: (housingStockId: number) => void;
  setFileName: (name: string) => void;
  grouptype: StatisticProfileGrouptype;
  searchType: SubscribersConsumptionSearchType;
  housingStockId: number | null;
  housingStockAddress: Partial<HousingStockAddressForm>;
};
