import {
  ApartmentResponse,
  ApartmentStatusSetRequest,
  DocumentResponsePagedList,
  IndividualDeviceWithExpiredCheckingDateListResponse,
  IndividualDeviceWithExpiredCheckingDateResponse,
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
  const res: DocumentResponsePagedList = await axios.get(
    `Apartmens/${apartmentId}/IndividualDeviceCheckDocuments`
  );

  return res.items;
};
