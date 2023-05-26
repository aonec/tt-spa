import {
  getAllIndividualDeviceMountPlaces,
  getIndividualDeviceMountPlaces,
} from './../../../../_api/individualDeviceMountPlaces';
import {
  $allIndividualDeviceMountPlaces,
  AllIndividualDeviceMountPlacesGate,
  IndividualDeviceMountPlacesGate,
  fetchAllIndividualDeviceMountPlacesFx,
} from './index';
import { combine, sample } from 'effector';
import {
  $individualDeviceMountPlaces,
  fetchIndividualDeviceFxMountPlacesFx,
} from '.';

fetchIndividualDeviceFxMountPlacesFx.use(getIndividualDeviceMountPlaces);

$individualDeviceMountPlaces.on(
  fetchIndividualDeviceFxMountPlacesFx.doneData,
  (_, places) => places,
);

sample({
  source: IndividualDeviceMountPlacesGate.state.map(
    (params) => params.apartmentId,
  ),
  clock: IndividualDeviceMountPlacesGate.state,
  target: fetchIndividualDeviceFxMountPlacesFx,
});

fetchAllIndividualDeviceMountPlacesFx.use(getAllIndividualDeviceMountPlaces);
const $isAllMountPlacesLoading = fetchAllIndividualDeviceMountPlacesFx.pending;

$allIndividualDeviceMountPlaces.on(
  fetchAllIndividualDeviceMountPlacesFx.doneData,
  (_, places) => places,
);

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
