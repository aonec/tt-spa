import { axios } from 'api/axios';
import {
  BuildingAddressCreateRequest,
  BuildingAddressUpdateRequest,
  HousingStockUpdateRequest,
} from 'api/myApi';

export const updateHousingStock = (payload: {
  housingStockId: number;
  data: HousingStockUpdateRequest;
}): Promise<void> =>
  axios.put(`HousingStocks/${payload.housingStockId}`, payload.data);

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
