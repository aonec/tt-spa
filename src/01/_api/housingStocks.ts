import {
  HousingStockListResponse,
  HousingStockResponse,
  NumberIdResponse,
  StringPagedList,
} from './../../myApi';
import axios from '01/axios';
import { formQueryString } from '01/utils/formQueryString';

export interface GetHousingStockParams {
  City: string;
  Street: string;
  HousingStockNumber: string;
  Corpus: string;
}

export const getHousingStocks = async (params: GetHousingStockParams) => {
  const queryString = formQueryString(params);
  const res: { items: HousingStockListResponse[] } = await axios.get(
    `HousingStocks${queryString}`
  );
  return res?.items;
};

export const getHousingStock = async (
  id: number
): Promise<HousingStockResponse> => {
  return await axios.get(`HousingStocks/${id}`);
};

export const doesApartmentExist = async ({
  housingStockId,
  apartmentNumber,
}: {
  housingStockId: number;
  apartmentNumber: string;
}): Promise<number | null> => {
  const res: any = await axios.get(
    `HousingStocks/${housingStockId}/doesApartmentExist/${apartmentNumber}`
  );

  if (typeof res === 'number') return res;

  return res?.successResponse;
};

export const getExistingCities = async () => {
  const res: StringPagedList = await axios.get('HousingStocks/ExistingCities');

  return res.items;
};

export interface GetExistingHousingStockParams {
  housingStockId: number;
  payload: { city?: string | null; street?: string | null };
}

export const getExistingHousingStockNumbers = ({
  housingStockId,
  payload,
}: GetExistingHousingStockParams): Promise<NumberIdResponse[] | null> =>
  axios.get(`HousingStocks/${housingStockId}/ExistingHousingStockNumber`, {
    params: payload,
  });
