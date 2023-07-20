import { axios } from 'api/axios';
import { IndividualDeviceMountPlaceForFilterResponse } from 'api/myApi';

export const fetchMouintPlaces = (): Promise<
  IndividualDeviceMountPlaceForFilterResponse[]
> => axios.get('IndividualDeviceMountPlaces/All');
