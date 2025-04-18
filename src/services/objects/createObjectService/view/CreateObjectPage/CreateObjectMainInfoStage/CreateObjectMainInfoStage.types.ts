import {
  EHouseCategory,
  ELivingHouseType,
  ENonResidentialHouseType,
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
} from 'api/types';
import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';
import { OpenPayload } from 'services/objects/updateHouseManagement/updateHouseManagementService.types';

export type CreateObjectMainInfoStageProps = {
  houseManagements: HouseManagementResponse[] | null;
  goBackStage: (payload: void) => void;
  onPageCancel: (payload: void) => void;
  handleSubmitCreateObject: (payload: ObjectCreateSubmitData) => void;
  createObjectData: ObjectCreateSubmitData | null;
  heatingStations: HeatingStationResponsePagedList | null;
  openCreateHeatingStationModal: () => void;
  openEditHeatingStationModal: () => void;
  heatingStationCapture: (payload: HeatingStationResponse) => void;
  handleOpenHouseManagementModal: () => void;
  handleOpenUpdateHouseManagementModal: (payload: OpenPayload) => void;
};

export type ObjectMainInfoValues = {
  houseManagement: string | null;
  objectCategory: EHouseCategory | null;
  livingHouseType: ELivingHouseType | null;
  nonResidentialHouseType: ENonResidentialHouseType | null;
  heatingStationId: string | null;
  hasIndividualHeatingStation: boolean;
};
