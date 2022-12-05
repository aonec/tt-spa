import {
  HeatingStationResponsePagedList,
  HouseManagementResponse,
} from 'myApi';
import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';

export type CreateObjectFinalStageModalProps = {
  createObjectData: ObjectCreateSubmitData | null;
  houseManagements: HouseManagementResponse[] | null;
  handlePostCreateObject: () => void;
  heatingStations: HeatingStationResponsePagedList | null;
  closePreviewModal: () => void;
  isPreviewModalOpen: boolean;
};
