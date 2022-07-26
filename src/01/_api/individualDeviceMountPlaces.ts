import { IndividualDeviceMountPlaceListResponse } from '../../api/types';
import axios from '../../api/axios';

export const getIndividualDeviceMountPlaces = async (
  id: number
): Promise<IndividualDeviceMountPlaceListResponse[]> => {
  const res: any = await axios.get(
    `IndividualDeviceMountPlaces?apartmentId=${id}`
  );

  return res.items;
};
