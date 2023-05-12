import { axios } from '01/axios';
import { FindApartmentParams } from './addressIdSearchService.types';

export const fetchApartmentId = (
  payload: FindApartmentParams,
): Promise<number | null> =>
  axios.get('Apartments/FindApartmentId', { params: payload });
