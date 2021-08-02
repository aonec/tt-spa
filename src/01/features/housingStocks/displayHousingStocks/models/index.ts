import { HousingStockListResponse } from './../../../../../myApi';
import { createStore, createEffect, createEvent } from 'effector';
import { GetHousingStockParams } from '01/_api/housingStocks';

export const $housingStocks = createStore<HousingStockListResponse[] | null>(
  null
);

export const $isFetchingHousingStocksFailed = createStore(false);

export const filterFieldHasBeenChanged = createEvent<GetHousingStockParams>();

export const fetchHousingStocksFx = createEffect<
  GetHousingStockParams,
  HousingStockListResponse[]
>();
