import { axios } from '../../api/axios';
import { ApartmentListResponsePagedList } from './.../../api/types';
import { GetApartmentsListRequestPayload } from './displayApartmentsListService.types';

export const getApartments = (
  params: GetApartmentsListRequestPayload
): Promise<ApartmentListResponsePagedList> =>
  axios.get('Apartments', { params });
