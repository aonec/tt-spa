import { axios } from 'api/axios';
import { StringPagedList } from 'api/myApi';
import queryString from 'query-string';
import { GetExistingSteetRequestParams } from './addressSearchService.types';

export const getExistingCities = async () => {
  const res: StringPagedList = await axios.get('Buildings/ExistingCities');

  return res.items;
};

export const getExistingStreets = async (
  params: GetExistingSteetRequestParams,
): Promise<string[]> => {
  const res: { items: string[] } = await axios.get(
    `Buildings/ExistingStreets`,
    { params, paramsSerializer: queryString.stringify },
  );

  return res.items;
};
