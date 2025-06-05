import { axios } from 'api/axios';
import {
  AddHeatingStationRequest,
  EHouseCategory,
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HousingStockCreateRequest,
  HousingStockResponse,
  NonResidentialBuildingCreateRequest,
  NonResidentialBuildingResponse,
} from 'api/types';
import {
  CreateBuildingRequest,
  CreateBuildingResponse,
} from './createObjectService.types';

export const getHeatingStations =
  (): Promise<HeatingStationResponsePagedList | null> => {
    return axios.get('HeatingStation');
  };

export const postHeatingStation = (
  requestPayload: AddHeatingStationRequest,
): Promise<HeatingStationResponse | null> => {
  return axios.post('HeatingStation', requestPayload);
};

export const createObject = async ({
  objectCategory,
  ...payload
}: CreateBuildingRequest) => {
  if (objectCategory === EHouseCategory.Living) {
    return await createHousingStock(payload);
  }
  return await createNonResidentialBuilding(payload);
};

const createHousingStock = async (
  requestPayload: HousingStockCreateRequest,
): Promise<CreateBuildingResponse> => {
  const res: HousingStockResponse | null = await axios.post(
    'HousingStocks',
    requestPayload,
  );

  return { houseCategory: EHouseCategory.Living, id: res?.id };
};

const createNonResidentialBuilding = async (
  requestPayload: NonResidentialBuildingCreateRequest,
): Promise<CreateBuildingResponse> => {
  const res: NonResidentialBuildingResponse | null = await axios.post(
    'NonResidentialBuildings',
    requestPayload,
  );

  return { houseCategory: EHouseCategory.NonResidential, id: res?.id };
};
