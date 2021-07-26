import { getIndividualDeviceMountPlaces } from './../../../../_api/individualDeviceMountPlaces';
import { IndividualDeviceMountPlacesGate } from './index';
import { forward, guard } from 'effector';
import {
  $individualDeviceMountPlaces,
  fetchIndividualDeviceMountPlacesFx,
} from '.';

fetchIndividualDeviceMountPlacesFx.use(getIndividualDeviceMountPlaces);

$individualDeviceMountPlaces.on(
  fetchIndividualDeviceMountPlacesFx.doneData,
  (_, places) => places
);

forward({
  from: guard({
    clock: IndividualDeviceMountPlacesGate.open,
    source: $individualDeviceMountPlaces,
    filter: (places) => places === null,
  }),
  to: fetchIndividualDeviceMountPlacesFx,
});
