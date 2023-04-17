import { createGate } from 'effector-react';
import { createStore, createEffect } from 'effector';
import {
  IndividualDeviceMountPlaceForFilterResponse,
  IndividualDeviceMountPlaceListResponse,
} from './../../../../../myApi';

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

export const $allIndividualDeviceMountPlaces = createStore<
  IndividualDeviceMountPlaceForFilterResponse[] | null
>(null);

export const fetchAllIndividualDeviceMountPlacesFx = createEffect<
  void,
  IndividualDeviceMountPlaceForFilterResponse[]
>();

export const AllIndividualDeviceMountPlacesGate = createGate();
