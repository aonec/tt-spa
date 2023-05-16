import {
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
  HousingStockAddressCreateRequest,
  HousingStockAddressUpdateRequest,
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
  handleCreateHousingStockAddress: (
    payload: HousingStockAddressCreateRequest,
  ) => void;
  handleUpdateHousingStockAddress: (payload: {
    addressId: number;
    data: HousingStockAddressUpdateRequest;
  }) => void;
  handleDeleteHousingStockAddress: (payload: { addressId: number }) => void;
  isDeleteLoading: boolean;
};

export enum EditObjectPageTabs {
  Address = 'Address',
  MainInfo = 'MainInfo',
  AdditionalInfo = 'AdditionalInfo',
}
