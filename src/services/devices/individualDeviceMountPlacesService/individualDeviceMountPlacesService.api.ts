import { axios } from '01/axios';
import {
  IndividualDeviceMountPlaceForFilterResponse,
  IndividualDeviceMountPlaceListResponse,
} from 'myApi';

export const getIndividualDeviceMountPlaces = async (
  id: number,
): Promise<IndividualDeviceMountPlaceListResponse[]> => {
  const res: any = await axios.get('IndividualDeviceMountPlaces', {
    params: { apartmentId: id },
  });

  return res.items;
};

export const getAllIndividualDeviceMountPlaces = (): Promise<
  IndividualDeviceMountPlaceForFilterResponse[]
> => {
  return axios.get(`IndividualDeviceMountPlaces/All`);
};
