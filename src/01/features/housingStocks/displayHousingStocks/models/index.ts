import { createGate } from 'effector-react';
import { HousingStockListResponse } from './../../../../../myApi';
import { createStore, createEffect } from 'effector';

export const $housingStocks = createStore<HousingStockListResponse[] | null>(
  null
);

export const $isFetchingHousingStocksFailed = createStore(false);

export const fetchHousingStocksFx = createEffect<
  void,
  HousingStockListResponse[]
>();
