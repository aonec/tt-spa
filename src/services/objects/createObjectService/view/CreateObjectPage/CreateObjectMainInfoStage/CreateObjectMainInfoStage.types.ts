import { HouseManagementResponse } from 'myApi';

export type CreateObjectMainInfoStageProps = {
  houseManagements: HouseManagementResponse[] | null;
  goBackStage: (payload: void) => void;
  onPageCancel: (payload: void) => void
};
