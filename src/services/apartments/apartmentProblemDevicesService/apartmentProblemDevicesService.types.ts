import { ApartmentStatusSetRequest } from 'api/myApi';

export interface GetProblemDevicesRequestPayload {
  apartmentId: number;
  requestPayload: ApartmentStatusSetRequest;
}
