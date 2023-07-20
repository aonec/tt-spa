import { axios } from 'api/axios';
import { IndividualDeviceMountPlaceForFilterResponse } from 'myApi';

export const fetchMouintPlaces = (): Promise<
  IndividualDeviceMountPlaceForFilterResponse[]
> => axios.get('IndividualDeviceMountPlaces/All');
