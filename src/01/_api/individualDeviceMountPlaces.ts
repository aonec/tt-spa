import { IndividualDeviceMountPlaceListResponse } from './../../myApi';
import axios from '01/axios';

export const getIndividualDeviceMountPlaces = async (): Promise<
  IndividualDeviceMountPlaceListResponse[]
> => {
  const res: any = await axios.get('IndividualDeviceMountPlaces');

  return res.items;
};
