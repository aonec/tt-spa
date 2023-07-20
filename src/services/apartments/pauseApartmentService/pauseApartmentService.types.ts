import { ApartmentStatusSetRequest } from 'api/myApi';

export type Props = {
  apartmentId: number;
};

export type SetApartmentStatusRequest = {
  apartmentId: number;
  requestPayload: ApartmentStatusSetRequest;
};
