import { axios } from 'api/axios';
import { ApartmentListResponsePagedList, StringPagedList } from 'api/types';
import queryString from 'query-string';
import {
  GetApartmentsRequest,
  GetExistingSteetRequestParams,
} from './addressSearchService.types';

export const getExistingCities = async () => {
  const res: StringPagedList = await axios.get('Buildings/ExistingCities');

  return res.items;
};

export const getExistingStreets = async (
  params: GetExistingSteetRequestParams,
): Promise<string[]> => {
  const res: { items: string[] } = await axios.get(
    `Buildings/ExistingStreets`,
    { params, paramsSerializer: (params) => queryString.stringify(params) },
  );

  return res.items;
};

export const getApartments = (
  params: GetApartmentsRequest,
): Promise<ApartmentListResponsePagedList> => {
  return axios.get('Apartments', {
    params,
  });
};
