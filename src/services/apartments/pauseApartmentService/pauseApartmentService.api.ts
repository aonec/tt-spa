import { axios } from 'api/axios';
import { SetApartmentStatusRequest } from './pauseApartmentService.types';
import { IndividualDeviceWithExpiredCheckingDateListResponse } from 'api/types';

export const setApartmentStatus = ({
  apartmentId,
  requestPayload,
}: SetApartmentStatusRequest): Promise<IndividualDeviceWithExpiredCheckingDateListResponse> => {
  return axios.patch(`Apartments/${apartmentId}/SetStatus`, requestPayload);
};
