import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';

export type CreateObjectAdditionalInfoStageProps = {
  goBackStage: () => void;
  onPageCancel: () => void;
  handleSubmitCreateObject: (payload: ObjectCreateSubmitData) => void;
};

export type AdditionalInfo = {
  floors: string;
  entrances: string;
  elevater: string;
};
