import { axios } from 'api/axios';
import { FindApartmentParams } from './addressIdSearchService.types';

export const fetchApartmentId = (
  payload: FindApartmentParams,
): Promise<number | null> =>
  axios.get('Apartments/FindApartmentId', { params: payload });
