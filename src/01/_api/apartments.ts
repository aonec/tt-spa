import {
  ApartmentResponse,
  ApartmentStatusSetRequest,
  IndividualDeviceWithExpiredCheckingDateListResponse,
} from './../../myApi';
import axios from '01/axios';

export const getApartment = async (id: number): Promise<ApartmentResponse> => {
  const res: any = await axios.get(`Apartments/${id}`);

  return res;
};

export interface SetApartmentStatusRequest {
  apartmentId: number;
  requestPayload: ApartmentStatusSetRequest;
}

export const setApartmentStatus = ({
  apartmentId,
  requestPayload,
}: SetApartmentStatusRequest): Promise<IndividualDeviceWithExpiredCheckingDateListResponse> =>
  axios.patch(`Apartments/${apartmentId}/SetStatus`, requestPayload);
