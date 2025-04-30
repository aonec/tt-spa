import {
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
} from 'api/types';
import { ObjectCreateSubmitData } from '../../createObjectService.types';
import { OpenPayload } from 'services/objects/updateHouseManagement/updateHouseManagementService.types';

export type CreateObjectPageProps = {
  existingStreets: string[] | null;
  existingCities: string[] | null;
  stageNumber: number;
  houseManagements: HouseManagementResponse[] | null;
  goBackStage: () => void;
  onPageCancel: () => void;
  createObjectData: ObjectCreateSubmitData | null;
  handleSubmitCreateObject: (values: ObjectCreateSubmitData) => void;
  heatingStations: HeatingStationResponsePagedList | null;
  handlePostCreateObject: () => void;
  isPreviewModalOpen: boolean;
  openPreviewModal: () => void;
  closePreviewModal: () => void;
  openCreateHeatingStationModal: () => void;
  openEditHeatingStationModal: () => void;
  heatingStationCapture: (payload: HeatingStationResponse) => void;
  isCreateLoading: boolean;
  handleOpenHouseManagementModal: () => void;
  handleOpenUpdateHouseManagementModal: (payload: OpenPayload) => void;
};
