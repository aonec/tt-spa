import { GetExistingSteetRequestParams } from '01/_api/existingStreets';
import { axios } from '01/axios';
import { StringPagedList } from 'myApi';
import queryString from 'query-string';

export const getExistingCities = async () => {
  const res: StringPagedList = await axios.get('HousingStocks/ExistingCities');

  return res.items;
};

export const getExistingStreets = async (
  params: GetExistingSteetRequestParams,
): Promise<string[]> => {
  const res: { items: string[] } = await axios.get(
    `HousingStocks/ExistingStreets`,
    { params, paramsSerializer: queryString.stringify },
  );

  return res.items;
};
