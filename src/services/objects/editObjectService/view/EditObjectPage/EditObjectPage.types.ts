import {
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
  BuildingAddressCreateRequest,
  BuildingAddressUpdateRequest,
  HousingStockResponse,
  HousingStockUpdateRequest,
} from 'api/types';

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
    payload: BuildingAddressCreateRequest,
  ) => void;
  handleUpdateHousingStockAddress: (payload: {
    addressId: number;
    data: BuildingAddressUpdateRequest;
  }) => void;
  handleDeleteHousingStockAddress: (payload: { addressId: number }) => void;
  isDeleteLoading: boolean;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  handleRefetchHousingStock: () => void;
};

export enum EditObjectPageTabs {
  Address = 'Address',
  MainInfo = 'MainInfo',
  AdditionalInfo = 'AdditionalInfo',
}
