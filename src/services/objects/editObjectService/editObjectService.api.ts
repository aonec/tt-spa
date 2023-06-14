import { axios } from '01/axios';
import {
  HousingStockAddressCreateRequest,
  HousingStockAddressUpdateRequest,
  HousingStockResponse,
  HousingStockUpdateRequest,
} from 'myApi';

export const updateHousingStock = (payload: {
  housingStockId: number;
  data: HousingStockUpdateRequest;
}): Promise<HousingStockResponse> =>
  axios.put(`HousingStocks/${payload.housingStockId}`, payload.data);

export const createHousingStockAddress = (payload: {
  housingStockId: number;
  data: HousingStockAddressCreateRequest;
}): Promise<HousingStockResponse> =>
  axios.post(`HousingStocks/${payload.housingStockId}/Addresses`, payload.data);

export const updateHousingStockAddress = (payload: {
  housingStockId: number;
  addressId: number;
  data: HousingStockAddressUpdateRequest;
}): Promise<HousingStockResponse> =>
  axios.put(
    `HousingStocks/${payload.housingStockId}/Addresses/${payload.addressId}`,
    payload.data,
  );

export const deleteHousingStockAddress = (payload: {
  housingStockId: number;
  addressId: number;
}): Promise<HousingStockResponse> =>
  axios.delete(
    `HousingStocks/${payload.housingStockId}/Addresses/${payload.addressId}`,
  );
