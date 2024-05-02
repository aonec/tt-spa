import { createGate } from 'effector-react';
import { createStore, createEffect, combine, sample } from 'effector';
import {
  IndividualDeviceMountPlaceForFilterResponse,
  IndividualDeviceMountPlaceListResponse,
} from 'api/types';
import {
  getAllIndividualDeviceMountPlaces,
  getIndividualDeviceMountPlaces,
} from './individualDeviceMountPlacesService.api';

const fetchIndividualDeviceFxMountPlacesFx = createEffect<
  number,
  IndividualDeviceMountPlaceListResponse[]
>(getIndividualDeviceMountPlaces);
const $individualDeviceMountPlaces = createStore<
  IndividualDeviceMountPlaceListResponse[] | null
>(null).on(
  fetchIndividualDeviceFxMountPlacesFx.doneData,
  (_, places) => places,
);

const fetchAllIndividualDeviceMountPlacesFx = createEffect<
  void,
  IndividualDeviceMountPlaceForFilterResponse[]
>(getAllIndividualDeviceMountPlaces);
const $allIndividualDeviceMountPlaces = createStore<
  IndividualDeviceMountPlaceForFilterResponse[] | null
>(null).on(
  fetchAllIndividualDeviceMountPlacesFx.doneData,
  (_, places) => places,
);

const AllIndividualDeviceMountPlacesGate = createGate();
const IndividualDeviceMountPlacesGate = createGate<{
  apartmentId: number;
}>();

const $apartmentId = IndividualDeviceMountPlacesGate.state.map(
  (params) => params.apartmentId || null,
);

sample({
  source: $apartmentId,
  filter: Boolean,
  clock: IndividualDeviceMountPlacesGate.state,
  target: fetchIndividualDeviceFxMountPlacesFx,
});

const $isAllMountPlacesLoading = fetchAllIndividualDeviceMountPlacesFx.pending;

sample({
  clock: AllIndividualDeviceMountPlacesGate.open,
  source: combine(
    $allIndividualDeviceMountPlaces,
    $isAllMountPlacesLoading,
    (allIndividualDeviceMountPlaces, isAllMountPlacesLoading) => ({
      allIndividualDeviceMountPlaces,
      isAllMountPlacesLoading,
    }),
  ),
  filter: ({ allIndividualDeviceMountPlaces, isAllMountPlacesLoading }) =>
    !allIndividualDeviceMountPlaces?.length && !isAllMountPlacesLoading,
  target: fetchAllIndividualDeviceMountPlacesFx,
});

export const individualDeviceMountPlacesService = {
  outputs: {
    $individualDeviceMountPlaces,
    $allIndividualDeviceMountPlaces,
  },
  gates: {
    AllIndividualDeviceMountPlacesGate,
    IndividualDeviceMountPlacesGate,
  },
};
