import { createGate } from 'effector-react';
import { createStore, createEffect } from 'effector';
import { HousingStockResponse } from './../../../../../myApi';

export const $housingStock = createStore<HousingStockResponse | null>(null);

export const fetchHousingStockFx = createEffect<number, HousingStockResponse>();

export const HousingStockGate = createGate<{ id: number }>();
