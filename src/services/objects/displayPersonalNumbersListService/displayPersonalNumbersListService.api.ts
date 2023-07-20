import { axios } from 'api/axios';
import { ApartmentListResponsePagedList } from 'api/myApi';
import { GetApartmentsListRequestPayload } from '../displayApartmentsListService/displayApartmentsListService.types';

export const getApartments = (
  params: GetApartmentsListRequestPayload,
): Promise<ApartmentListResponsePagedList> =>
  axios.get('Apartments', { params: { ...params, PageSize: 30 } });
