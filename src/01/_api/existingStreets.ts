import axios from '01/axios';
import { formQueryString } from '01/utils/formQueryString';
import { EOrderByRule } from 'myApi';

interface Params {
  Street?: string | null;
  City?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

export type GetExistingSteetRequestParams = Params;

export const getExistingStreets = async (params: Params): Promise<string[]> => {
  const res: { items: string[] } = await axios.get(
    `HousingStocks/ExistingStreets${formQueryString(params)}`
  );

  return res.items;
};
