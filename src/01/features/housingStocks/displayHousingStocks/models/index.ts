import { HousingStockListResponse } from './../../../../../myApi';
import { createStore, createEffect, createEvent } from 'effector';

export const $housingStocks = createStore<HousingStockListResponse[] | null>(
  null
);

export const $isFetchingHousingStocksFailed = createStore(false);

export const filterFieldHasBeenChanged = createEvent();

export const fetchHousingStocksFx = createEffect<
  void,
  HousingStockListResponse[]
>();
