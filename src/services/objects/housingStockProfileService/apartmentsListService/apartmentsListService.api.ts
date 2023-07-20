import { axios } from 'api/axios';
import { ApartmentListResponsePagedList } from 'myApi';

export const getApartmentsList = (
  housingStockId: number,
): Promise<ApartmentListResponsePagedList> =>
  axios.get('Apartments', { params: { housingStockId } });
