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
  try {
    const queryString = formQueryString(params);

    const res: { items: HousingStockListResponse[] } = await axios.get(
      `HousingStocks${queryString}`,
    );

    return res?.items;
  } catch (error) {
    return null;
  }
};

export const getHousingStock = async (
  id: number,
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
    `HousingStocks/${housingStockId}/doesApartmentExist/${apartmentNumber}`,
  );

  if (typeof res === 'number') return res;

  return res?.successResponse;
};

export const getExistingCities = async () => {
  const res: StringPagedList = await axios.get('HousingStocks/ExistingCities');

  return res.items;
};

export interface GetExistingHousingStockParams {
  city?: string | null;
  street?: string | null;
}

export const getExistingHousingStockNumbers = (
  params: GetExistingHousingStockParams,
): Promise<NumberIdResponse[] | null> =>
  axios.get(`HousingStocks/ExistingHousingStockNumber`, {
    params,
  });

export const getExistingApartmentNumbers = (
  housingStockId: number,
): Promise<NumberIdResponse[] | null> =>
  axios.get(`HousingStocks/${housingStockId}/ExistingApartmentNumber`);
