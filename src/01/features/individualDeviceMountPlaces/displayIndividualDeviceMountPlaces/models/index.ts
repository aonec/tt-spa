import { createGate } from 'effector-react';
import { createStore, createEffect } from 'effector';
import { IndividualDeviceMountPlaceListResponse } from './../../../../../myApi';

export const $individualDeviceMountPlaces = createStore<
  IndividualDeviceMountPlaceListResponse[] | null
>(null);

export const fetchIndividualDeviceMountPlacesFx = createEffect<
  void,
  IndividualDeviceMountPlaceListResponse[]
>();

export const IndividualDeviceMountPlacesGate = createGate();
