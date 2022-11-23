import { HouseManagementResponse } from 'myApi';
import { ObjectAddressValues } from './CreateObjectAddressStage/CreateObjectAddressStage.types';

export type CreateObjectPageProps = {
  existingStreets: string[] | null;
  existingCities: string[] | null;
  stageNumber: number;
  handleAddressData: (payload: ObjectAddressValues) => void;
  houseManagements: HouseManagementResponse[] | null;
  goBackStage: (payload: void) => void;
  onPageCancel: (payload: void) => void;
  createObjectData: ObjectAddressValues | null;
  
};
