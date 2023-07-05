import { axios } from '01/axios';
import {
  BuildingAddressCreateRequest,
  BuildingAddressUpdateRequest,
  HousingStockResponse,
  HousingStockUpdateRequest,
} from 'myApi';

export const updateHousingStock = (payload: {
  housingStockId: number;
  data: HousingStockUpdateRequest;
}): Promise<void> =>
  axios.put(`HousingStocks/${payload.housingStockId}`, payload.data);

export const createHousingStockAddress = (payload: {
  housingStockId: number;
  data: BuildingAddressCreateRequest;
}): Promise<void> =>
  axios.post(`HousingStocks/${payload.housingStockId}/Addresses`, payload.data);

export const updateHousingStockAddress = (payload: {
  housingStockId: number;
  addressId: number;
  data: BuildingAddressUpdateRequest;
}): Promise<HousingStockResponse> =>
  axios.put(
    `HousingStocks/${payload.housingStockId}/Addresses/${payload.addressId}`,
    payload.data,
  );

export const deleteHousingStockAddress = (payload: {
  housingStockId: number;
  addressId: number;
}): Promise<void> =>
  axios.delete(
    `HousingStocks/${payload.housingStockId}/Addresses/${payload.addressId}`,
  );
