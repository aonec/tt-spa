import { createGate } from 'effector-react';
import { createStore, createEffect } from 'effector';
import { IndividualDeviceMountPlaceListResponse } from './../../../../../myApi';

export const $individualDeviceMountPlaces = createStore<
  IndividualDeviceMountPlaceListResponse[] | null
>(null);

export const fetchIndividualDeviceFxMountPlacesFx = createEffect<
  number,
  IndividualDeviceMountPlaceListResponse[]
>();

export const IndividualDeviceMountPlacesGate = createGate<{
  apartmentId: number;
}>();
