import { HouseManagementResponse } from 'myApi';

export type CreateObjectMainInfoStageProps = {
  houseManagements: HouseManagementResponse[] | null;
  goBackStage: (payload: void) => void;
  onPageCancel: (payload: void) => void;
  handleMainInfoData: (payload: ObjectMainInfoValues) => void;
};

export type ObjectMainInfoValues = {
  houseManagement: string;
  objectCategotry: string;
  objectType: string;
  heatingPoint: { heatingPointType: string; heatingPointNumber: string };
};
