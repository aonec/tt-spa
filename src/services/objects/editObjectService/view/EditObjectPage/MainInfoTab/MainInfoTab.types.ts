import {
  EHouseCategory,
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
  HousingStockResponse,
  HousingStockUpdateRequest,
  NonResidentialBuildingResponse,
} from 'api/types';
import { OpenPayload } from 'services/objects/updateHouseManagement/updateHouseManagementService.types';

export type MainInfoTabProps = {
  housingStock: HousingStockResponse | null;
  nonResidentialBuilding: NonResidentialBuildingResponse | null;
  houseManagements: HouseManagementResponse[] | null;
  openCreateHeatingStationModal: () => void;
  openEditHeatingStationModal: () => void;
  heatingStations: HeatingStationResponsePagedList | null;
  heatingStationCapture: (payload: HeatingStationResponse) => void;
  onPageCancel: () => void;
  handleUpdateHousingStock: (payload: HousingStockUpdateRequest) => void;
  isHeatingStationsLoading: boolean;
  isHouseManagementsLoading: boolean;
  houseCategory: EHouseCategory;
  handleOpenEditHouseManagementModal: (payload: OpenPayload) => void;
  handleOpenHouseManagementModal: () => void;
};
