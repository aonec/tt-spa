import { axios } from '01/axios';

export const getApartmentsList = (housingStockId: number) => {
  return axios.get('Apartments', { params: { housingStockId } });
};
