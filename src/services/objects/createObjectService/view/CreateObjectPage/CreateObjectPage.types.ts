import { HouseManagementResponse } from 'myApi';
import { ObjectCreateSubmitData } from '../../createObjectService.types';
import { AdditionalInfo } from './CreateObjectAdditionalInfoStage/CreateObjectAdditionalInfoStage.types';
import { ObjectAddressValues } from './CreateObjectAddressStage/CreateObjectAddressStage.types';
import { ObjectMainInfoValues } from './CreateObjectMainInfoStage/CreateObjectMainInfoStage.types';

export type CreateObjectPageProps = {
  existingStreets: string[] | null;
  existingCities: string[] | null;
  stageNumber: number;
  // handleAddressData: (payload: ObjectAddressValues) => void;
  // handleMainInfoData: (payload: ObjectMainInfoValues) => void;
  // handleAdditionalInfoData: (payload: AdditionalInfo) => void;
  houseManagements: HouseManagementResponse[] | null;
  goBackStage: () => void;
  onPageCancel: () => void;
  createObjectData: ObjectCreateSubmitData | null;
  handleSubmitCreateObject: (values: ObjectCreateSubmitData) => void;
};
