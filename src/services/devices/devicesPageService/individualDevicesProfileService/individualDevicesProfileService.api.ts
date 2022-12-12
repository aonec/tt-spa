import { axios } from '01/axios';
import { IndividualDeviceMountPlaceForFilterResponse } from 'myApi';

export const fetchMouintPlaces = (): Promise<
  IndividualDeviceMountPlaceForFilterResponse[]
> => axios.get('IndividualDeviceMountPlaces/All');
