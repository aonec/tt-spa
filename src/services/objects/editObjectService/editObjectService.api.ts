import { axios } from 'api/axios';
import {
  BuildingAddressCreateRequest,
  BuildingAddressUpdateRequest,
  EHouseCategory,
  HousingStockResponse,
  NonResidentialBuildingResponse,
} from 'api/types';
import { EditObjectPayload } from './editObjectService.types';

export const updateHousingStock = async ({
  data,
  houseCategory,
  buildingId,
}: EditObjectPayload): Promise<void> => {
  if (houseCategory === EHouseCategory.Living)
    return await axios.put(`HousingStocks/${buildingId}`, data);
  if (houseCategory === EHouseCategory.NonResidential)
    return await axios.put(`NonResidentialBuildings/${buildingId}`, data);
};

export const createHousingStockAddress = (payload: {
  housingStockId: number;
  data: BuildingAddressCreateRequest;
}): Promise<void> =>
  axios.post(`Buildings/${payload.housingStockId}/Addresses`, payload.data);

export const updateHousingStockAddress = (payload: {
  housingStockId: number;
  addressId: number;
  data: BuildingAddressUpdateRequest;
}): Promise<void> =>
  axios.put(
    `Buildings/${payload.housingStockId}/Addresses/${payload.addressId}`,
    payload.data,
  );

export const deleteHousingStockAddress = (payload: {
  housingStockId: number;
  addressId: number;
}): Promise<void> =>
  axios.delete(
    `Buildings/${payload.housingStockId}/Addresses/${payload.addressId}`,
  );

export const getHousingStock = ({
  buildingId,
}: {
  buildingId: number;
}): Promise<HousingStockResponse> => axios.get(`/HousingStocks/${buildingId}`);

export const getNonResidentialBuilding = ({
  buildingId,
}: {
  buildingId: number;
}): Promise<NonResidentialBuildingResponse> =>
  axios.get(`NonResidentialBuildings/${buildingId}`);
