import { createStore, createEffect, createEvent } from 'effector';
import { HousingStockListResponse } from '../../../../../api/types';
import { GetHousingStockParams } from '../../../../_api/housingStocks';

export const $housingStocks = createStore<HousingStockListResponse[] | null>(
  null
);

export const $isFetchingHousingStocksFailed = createStore(false);

export const filterFieldHasBeenChanged = createEvent<GetHousingStockParams>();

export const fetchHousingStocksFx = createEffect<
  GetHousingStockParams,
  HousingStockListResponse[]
>();
