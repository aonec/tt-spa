import { HousingStockWithApartmentStatistic } from '../../displayStatisticsListByManagingFirmService.types';

export type HousingStocksListProps = {
  housingStocks: HousingStockWithApartmentStatistic[];
  selectHousingStock: (id: number) => void;
  statisticIsLoading: boolean;
  handleOpenModal: (housingstock: number) => void;
  selectedHousingStock: number;
};
