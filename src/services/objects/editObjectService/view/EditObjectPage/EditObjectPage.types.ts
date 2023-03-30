import {
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
  HousingStockResponse,
  HousingStockUpdateRequest,
} from 'myApi';

export type EditObjectPageProps = {
  housingStock: HousingStockResponse;
  existingCities: string[] | null;
  existingStreets: string[];
  houseManagements: HouseManagementResponse[] | null;
  openCreateHeatingStationModal: () => void;
  openEditHeatingStationModal: () => void;
  heatingStations: HeatingStationResponsePagedList | null;
  heatingStationCapture: (payload: HeatingStationResponse) => void;
  onPageCancel: () => void;
  handleUpdateHousingStock: (payload: HousingStockUpdateRequest) => void;
  isHouseManagementsLoading: boolean;
  isHeatingStationsLoading: boolean;
};

export enum EditObjectPageTabs {
  Address = 'Address',
  MainInfo = 'MainInfo',
  AdditionalInfo = 'AdditionalInfo',
}
