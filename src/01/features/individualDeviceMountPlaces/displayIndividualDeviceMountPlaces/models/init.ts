import { forward } from 'effector';
import {
  $individualDeviceMountPlaces,
  fetchIndividualDeviceMountPlacesFx,
} from '.';

forward({
  from: fetchIndividualDeviceMountPlacesFx.doneData,
  to: $individualDeviceMountPlaces,
});
