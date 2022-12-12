import {
  EHouseCategory,
  ELivingHouseType,
  ENonResidentialHouseType,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
} from 'myApi';
import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';

export type CreateObjectMainInfoStageProps = {
  houseManagements: HouseManagementResponse[] | null;
  goBackStage: (payload: void) => void;
  onPageCancel: (payload: void) => void;
  handleSubmitCreateObject: (payload: ObjectCreateSubmitData) => void;
  createObjectData: ObjectCreateSubmitData | null;
  heatingStations: HeatingStationResponsePagedList | null;
  openCreateHeatingStationModal: () => void;
};

export type ObjectMainInfoValues = {
  houseManagement: string | null;
  objectCategory: EHouseCategory | null;
  livingHouseType: ELivingHouseType | null;
  nonResidentialHouseType: ENonResidentialHouseType | null;
  heatingStationId: string | null;
};
