import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';
import { ElevatorExistingType } from '../CreateObjectFinalStageModal/CreateObjectFinalStageForm/CreateObjectFinalStageForm.types';

export type CreateObjectAdditionalInfoStageProps = {
  goBackStage: () => void;
  onPageCancel: () => void;
  handleSubmitCreateObject: (payload: ObjectCreateSubmitData) => void;
  createObjectData: ObjectCreateSubmitData | null;
  openPreviewModal: () => void
};

export type AdditionalInfo = {
  floors: number | null;
  entrances: number | null;
  elevator: ElevatorExistingType | null;
};
