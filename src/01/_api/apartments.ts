import {
  ApartmentResponse,
  ApartmentStatusSetRequest,
  IndividualDeviceWithExpiredCheckingDateListResponse,
  IndividualDeviceWithExpiredCheckingDateResponse,
  CreateApartmentCheckRequest,
  ApartmentCheckResponsePagedList,
} from './../../myApi';
import axios from '01/axios';
import { formQueryString } from '01/utils/formQueryString';

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
  return axios.patch(`Apartments/${apartmentId}/SetStatus`, requestPayload);
};

export interface GetProblemDevicesRequestPayload {
  apartmentId: number;
  requestPayload: ApartmentStatusSetRequest;
}

export const getProblemDevices = async ({
  requestPayload,
  apartmentId,
}: GetProblemDevicesRequestPayload): Promise<
  IndividualDeviceWithExpiredCheckingDateResponse[]
> => {
  const res: any = await axios.get(
    `Apartments/${apartmentId}/SetStatusProblemDevices${formQueryString(
      requestPayload
    )}`
  );

  return res.devices;
};

export const getApartmentCheckDocuments = async (apartmentId: number) => {
  const res: ApartmentCheckResponsePagedList = await axios.get(
    `Apartments/${apartmentId}/ApartmentChecks`
  );

  return res.items;
};

export const checkApartment = ({
  apartmentId,
  data,
}: {
  apartmentId: number;
  data: CreateApartmentCheckRequest;
}): Promise<void> => axios.post(`Apartments/${apartmentId}/AddCheck`, data);
