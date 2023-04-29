import {
  IndividualDeviceMountPlaceForFilterResponse,
  IndividualDeviceMountPlaceListResponse,
} from './../../myApi';
import axios from '01/axios';

export const getIndividualDeviceMountPlaces = async (
  id: number,
): Promise<IndividualDeviceMountPlaceListResponse[]> => {
  const res: any = await axios.get(
    `IndividualDeviceMountPlaces?apartmentId=${id}`,
  );

  return res.items;
};

export const getAllIndividualDeviceMountPlaces = (): Promise<
  IndividualDeviceMountPlaceForFilterResponse[]
> => {
  return axios.get(`IndividualDeviceMountPlaces/All`);
};
