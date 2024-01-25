import { axios } from 'api/axios';
import {
  GetHousingStocksListRequestPayload,
  GetHousingStocksRequestPayload,
  GetIndividualDevicesListRequestPayload,
} from './HousesReadingsService.types';
import {
  BuildingWithCoordinatesResponsePagedList,
  HousingStockResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'api/types';
import { createQuery } from '@farfetched/core';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

const getHousingStockId = async (
  params: GetHousingStocksListRequestPayload,
): Promise<number | null> => {
  const res: BuildingWithCoordinatesResponsePagedList | null = await axios.get(
    'Buildings/Lite',
    {
      params: { ...params, PageSize: 1, PageNumber: 1 },
    },
  );

  const housingStockListItem = res?.items?.[0];

  if (!housingStockListItem) return null;

  return housingStockListItem.id;
};

export const getHousingStockQuery = createQuery({
  effect: createEffect<
    GetHousingStocksRequestPayload,
    HousingStockResponse | null,
    EffectFailDataAxiosError
  >(async ({ HousingStockId, ...params }) => {
    const id = HousingStockId || (await getHousingStockId(params));

    if (!id) return null;

    return await axios.get(`HousingStocks/${id}`);
  }),
});

export const getIndividualDevicesList = (
  params: GetIndividualDevicesListRequestPayload,
): Promise<IndividualDeviceListItemResponsePagedList> =>
  axios.get('IndividualDevices', { params });
