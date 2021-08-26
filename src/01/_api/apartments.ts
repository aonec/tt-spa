import {
  ApartmentResponse,
  ApartmentStatusSetRequest,
  IndividualDeviceWithExpiredCheckingDateListResponse,
  IndividualDeviceWithExpiredCheckingDateResponse,
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
}: SetApartmentStatusRequest): Promise<IndividualDeviceWithExpiredCheckingDateListResponse> => {
  console.log(apartmentId);

  return axios.patch(`Apartments/${apartmentId}/SetStatus`, requestPayload);
};

export interface GetProblemDevicesRequestPayload {
  apartmentId: number;
  requestPayload: ApartmentStatusSetRequest;
}

export const getProblemDevices = ({
  requestPayload,
  apartmentId,
}: GetProblemDevicesRequestPayload): Promise<
  IndividualDeviceWithExpiredCheckingDateResponse[]
> => {
  const res: any = axios.get(
    `Apartments/${apartmentId}/SetStatusProblemDevices`,
    requestPayload as any
  );

  return res.devices;
};
