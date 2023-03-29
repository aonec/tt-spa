import { HouseManagementResponse, HousingStockResponse } from 'myApi';

export type MainInfoTabProps = {
  housingStock: HousingStockResponse;
  houseManagements: HouseManagementResponse[] | null;
  openCreateHeatingStationModal: () => void;
  openEditHeatingStationModal: () => void;
};
