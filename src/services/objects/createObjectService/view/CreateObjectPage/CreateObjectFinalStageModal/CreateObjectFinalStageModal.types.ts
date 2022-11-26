import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';

export type CreateObjectFinalStageModalProps = {
  onPageCancel: () => void;
  goBackStage: () => void;
  createObjectData: ObjectCreateSubmitData | null;
};
