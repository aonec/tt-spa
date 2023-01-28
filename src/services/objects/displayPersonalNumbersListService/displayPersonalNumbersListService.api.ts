import { axios } from '01/axios';
import { ApartmentListResponsePagedList } from 'myApi';
import { GetApartmentsListRequestPayload } from '../displayApartmentsListService/displayApartmentsListService.types';

export const getApartments = (
  params: GetApartmentsListRequestPayload
): Promise<ApartmentListResponsePagedList> =>
  axios.get('Apartments', { params: { ...params, PageSize: 30 } });
