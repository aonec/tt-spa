import { axios } from 'api/axios';
import { ApartmentListResponsePagedList } from 'api/types';

export const getApartmentsList = (
  housingStockId: number,
): Promise<ApartmentListResponsePagedList> =>
  axios.get('Apartments', { params: { housingStockId } });
