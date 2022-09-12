import { HousingStockWithApartmentStatistic } from '../../../displayStatisticsListByManagingFirmService.types';

export type HousingStocksListItemProps = {
  housingStock: HousingStockWithApartmentStatistic;
  selectHousingStock: (id: number) => void;
};
