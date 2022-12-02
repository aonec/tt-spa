import { HouseManagementResponse } from 'myApi';
import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';

export type CreateObjectFinalStageFormProps = {
  formId: string;
  createObjectData: ObjectCreateSubmitData | null;
  houseManagements : HouseManagementResponse[] | null
};

export enum ElevatorExistingType {
  Available = 'available',
  NotAvailable = 'notAvailable',
}
