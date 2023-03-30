import {
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
  HousingStockResponse,
} from 'myApi';

export type MainInfoTabProps = {
  housingStock: HousingStockResponse;
  houseManagements: HouseManagementResponse[] | null;
  openCreateHeatingStationModal: () => void;
  openEditHeatingStationModal: () => void;
  heatingStations: HeatingStationResponsePagedList | null;
  heatingStationCapture: (payload: HeatingStationResponse) => void;
  onPageCancel: () => void;
};
