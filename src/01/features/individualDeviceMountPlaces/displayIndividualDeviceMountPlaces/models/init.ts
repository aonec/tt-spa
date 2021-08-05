import { getIndividualDeviceMountPlaces } from './../../../../_api/individualDeviceMountPlaces';
import { IndividualDeviceMountPlacesGate } from './index';
import { sample } from 'effector';
import {
  $individualDeviceMountPlaces,
  fetchIndividualDeviceMountPlacesFx,
} from '.';

fetchIndividualDeviceMountPlacesFx.use(getIndividualDeviceMountPlaces);

$individualDeviceMountPlaces.on(
  fetchIndividualDeviceMountPlacesFx.doneData,
  (_, places) => places
);

sample({
  source: IndividualDeviceMountPlacesGate.state.map(
    (params) => params.apartmentId
  ),
  clock: IndividualDeviceMountPlacesGate.open,
  target: fetchIndividualDeviceMountPlacesFx,
});
