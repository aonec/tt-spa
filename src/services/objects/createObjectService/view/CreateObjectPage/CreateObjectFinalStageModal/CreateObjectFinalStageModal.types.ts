import {
  HeatingStationResponsePagedList,
  HouseManagementResponse,
} from 'api/myApi';
import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';

export type CreateObjectFinalStageModalProps = {
  createObjectData: ObjectCreateSubmitData | null;
  houseManagements: HouseManagementResponse[] | null;
  handlePostCreateObject: () => void;
  heatingStations: HeatingStationResponsePagedList | null;
  closePreviewModal: () => void;
  isPreviewModalOpen: boolean;
  isCreateLoading: boolean;
};
