import { HouseManagementResponse } from 'myApi';
import { ObjectAddressValues } from './CreateObjectAddressStage/CreateObjectAddressStage.types';

export type CreateObjectPageProps = {
  existingStreets: string[] | null;
  existingCities: string[] | null;
  stageNumber: number;
  handleAddressData: (payload: ObjectAddressValues) => void;
  houseManagements: HouseManagementResponse[] | null;
};
