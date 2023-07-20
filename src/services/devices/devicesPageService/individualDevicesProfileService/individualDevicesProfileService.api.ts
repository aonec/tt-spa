import { axios } from 'api/axios';
import { IndividualDeviceMountPlaceForFilterResponse } from 'api/types';

export const fetchMouintPlaces = (): Promise<
  IndividualDeviceMountPlaceForFilterResponse[]
> => axios.get('IndividualDeviceMountPlaces/All');
