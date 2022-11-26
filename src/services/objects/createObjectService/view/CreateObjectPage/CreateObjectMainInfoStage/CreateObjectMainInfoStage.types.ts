import { HouseManagementResponse } from 'myApi';
import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';

export type CreateObjectMainInfoStageProps = {
  houseManagements: HouseManagementResponse[] | null;
  goBackStage: (payload: void) => void;
  onPageCancel: (payload: void) => void;
  // handleMainInfoData: (payload: ObjectMainInfoValues) => void;
  handleSubmitCreateObject: (payload: ObjectCreateSubmitData) => void;
};

export type ObjectMainInfoValues = {
  houseManagement: string;
  objectCategotry: string;
  objectType: string;
  heatingPoint: { heatingPointType: string; heatingPointNumber: string };
};
