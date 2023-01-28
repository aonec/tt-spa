import { getIndividualDeviceMountPlaces } from './../../../../_api/individualDeviceMountPlaces';
import { IndividualDeviceMountPlacesGate } from './index';
import { sample } from 'effector';
import {
  $individualDeviceMountPlaces,
  fetchIndividualDeviceFxMountPlacesFx,
} from '.';

fetchIndividualDeviceFxMountPlacesFx.use(getIndividualDeviceMountPlaces);

$individualDeviceMountPlaces.on(
  fetchIndividualDeviceFxMountPlacesFx.doneData,
  (_, places) => places
);

sample({
  source: IndividualDeviceMountPlacesGate.state.map(
    (params) => params.apartmentId
  ),
  clock: IndividualDeviceMountPlacesGate.state,
  target: fetchIndividualDeviceFxMountPlacesFx,
});
