import { HouseManagementResponse } from 'myApi';
import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';

export type CreateObjectFinalStageModalProps = {
  onPageCancel: () => void;
  goBackStage: () => void;
  createObjectData: ObjectCreateSubmitData | null;
  houseManagements : HouseManagementResponse[] | null
};
