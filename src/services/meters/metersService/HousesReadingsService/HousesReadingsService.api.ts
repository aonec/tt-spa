import { axios } from '01/axios';
import {
  GetHousingStocksListRequestPayload,
  GetHousingStocksRequestPayload,
  GetIndividualDevicesListRequestPayload,
} from './HousesReadingsService.types';
import {
  HousingStockListResponsePagedList,
  HousingStockResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'myApi';

const getHousingStockId = async (
  params: GetHousingStocksListRequestPayload
): Promise<number | null> => {
  const res: HousingStockListResponsePagedList | null = await axios.get(
    'HousingStocks',
    {
      params: { ...params, PageSize: 1, PageNumber: 1 },
    }
  );

  const housingStockListItem = res?.items?.[0];

  if (!housingStockListItem) return null;

  return housingStockListItem.id;
};

export const getHousingStock = async ({
  HousingStockId,
  ...params
}: GetHousingStocksRequestPayload): Promise<HousingStockResponse | null> => {
  const id = HousingStockId || (await getHousingStockId(params));

  if (!id) return null;

  return await axios.get(`HousingStocks/${id}`);
};

export const getIndividualDevicesList = (
  params: GetIndividualDevicesListRequestPayload
): Promise<IndividualDeviceListItemResponsePagedList> =>
  axios.get('IndividualDevices', { params });