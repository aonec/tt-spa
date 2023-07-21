import {
  HeatingStationResponsePagedList,
  HouseManagementResponse,
} from 'api/types';
import { ObjectCreateSubmitData } from 'services/objects/createObjectService/createObjectService.types';

export type CreateObjectFinalStageFormProps = {
  formId: string;
  createObjectData: ObjectCreateSubmitData | null;
  houseManagements: HouseManagementResponse[] | null;
  heatingStations: HeatingStationResponsePagedList | null;
};

export enum ElevatorExistingType {
  Available = 'Available',
  NotAvailable = 'NotAvailable',
}
