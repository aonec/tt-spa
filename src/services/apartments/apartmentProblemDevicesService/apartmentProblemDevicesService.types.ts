import { ApartmentStatusSetRequest } from 'api/types';

export interface GetProblemDevicesRequestPayload {
  apartmentId: number;
  requestPayload: ApartmentStatusSetRequest;
}
