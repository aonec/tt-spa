import {
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
  BuildingAddressCreateRequest,
  BuildingAddressUpdateRequest,
  HousingStockResponse,
  HousingStockUpdateRequest,
  NonResidentialBuildingResponse,
  EHouseCategory,
} from 'api/types';
import { OpenPayload } from 'services/objects/updateHouseManagement/updateHouseManagementService.types';

export type EditObjectPageProps = {
  housingStock: HousingStockResponse | null;
  nonResidentialBuilding: NonResidentialBuildingResponse | null;
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
  houseCategory: EHouseCategory | null;
  handleOpenHouseManagementModal: () => void;
  handleOpenEditHouseManagementModal: (payload: OpenPayload) => void;
};

export enum EditObjectPageTabs {
  Address = 'Address',
  MainInfo = 'MainInfo',
  AdditionalInfo = 'AdditionalInfo',
}
