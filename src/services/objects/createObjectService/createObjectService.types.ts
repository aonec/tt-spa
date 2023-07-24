import { EHouseCategory, HousingStockCreateRequest, NonResidentialBuildingCreateRequest } from 'api/types';
import { AdditionalInfo } from './view/CreateObjectPage/CreateObjectAdditionalInfoStage/CreateObjectAdditionalInfoStage.types';
import { ObjectAddressValues } from './view/CreateObjectPage/CreateObjectAddressStage/CreateObjectAddressStage.types';
import { ObjectMainInfoValues } from './view/CreateObjectPage/CreateObjectMainInfoStage/CreateObjectMainInfoStage.types';

export type ObjectCreateSubmitData = Partial<
  ObjectAddressValues & ObjectMainInfoValues & AdditionalInfo
>;

export type CreateBuildingResponse = {
  houseCategory: EHouseCategory;
  id?: number;
};

export type CreateBuildingRequest = { objectCategory: EHouseCategory } & (
  | NonResidentialBuildingCreateRequest
  | HousingStockCreateRequest
);
