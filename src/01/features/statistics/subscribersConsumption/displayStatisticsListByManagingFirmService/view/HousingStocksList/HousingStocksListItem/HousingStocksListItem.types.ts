import { HousingStockWithApartmentStatistic } from '../../../displayStatisticsListByManagingFirmService.types';

export type HousingStocksListItemProps = {
  housingStock: HousingStockWithApartmentStatistic;
  selectHousingStock: (id: number) => void;
  statisticIsLoading: boolean;
  handleOpenModal: (housingStock: number) => void;
  selectedHousingStock: number;
};
