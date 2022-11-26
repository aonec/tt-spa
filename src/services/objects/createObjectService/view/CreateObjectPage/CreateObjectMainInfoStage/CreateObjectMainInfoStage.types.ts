import { HouseManagementResponse } from 'myApi';
import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';
import { HeatingPoint } from './NewHeatingPointForm/NewHeatingPointForm.types';

export type CreateObjectMainInfoStageProps = {
  houseManagements: HouseManagementResponse[] | null;
  goBackStage: (payload: void) => void;
  onPageCancel: (payload: void) => void;
  handleSubmitCreateObject: (payload: ObjectCreateSubmitData) => void;
  createObjectData: ObjectCreateSubmitData | null;
};

export type ObjectMainInfoValues = {
  houseManagement: string;
  objectCategotry: string;
  objectType: string;
  heatingPoint: HeatingPoint;
};
