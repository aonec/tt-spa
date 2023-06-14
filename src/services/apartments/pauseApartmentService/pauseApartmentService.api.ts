import { axios } from '01/axios';
import { SetApartmentStatusRequest } from './pauseApartmentService.types';
import { IndividualDeviceWithExpiredCheckingDateListResponse } from 'myApi';

export const setApartmentStatus = ({
  apartmentId,
  requestPayload,
}: SetApartmentStatusRequest): Promise<IndividualDeviceWithExpiredCheckingDateListResponse> => {
  return axios.patch(`Apartments/${apartmentId}/SetStatus`, requestPayload);
};
