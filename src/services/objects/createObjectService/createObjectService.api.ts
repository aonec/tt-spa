import { axios } from '01/axios';
import {
  AddHeatingStationRequest,
  EHouseCategory,
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
  HousingStockCreateRequest,
  HousingStockResponse,
} from 'myApi';
import { CreateBuildingResponse } from './createObjectService.types';

export const getHouseManagements = (): Promise<
  HouseManagementResponse[] | null
> => {
  return axios.get('HouseManagements');
};

export const getHeatingStations =
  (): Promise<HeatingStationResponsePagedList | null> => {
    return axios.get('HeatingStation');
  };

export const postHeatingStation = (
  requestPayload: AddHeatingStationRequest,
): Promise<HeatingStationResponse | null> => {
  return axios.post('HeatingStation', requestPayload);
};

export const postCreateObject = async (
  requestPayload: HousingStockCreateRequest,
): Promise<CreateBuildingResponse> => {
  const res: HousingStockResponse | null = await axios.post(
    'HousingStocks',
    requestPayload,
  );

  return { houseCategory: EHouseCategory.Living, id: res?.id };
};
