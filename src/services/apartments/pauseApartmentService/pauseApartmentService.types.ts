import { ApartmentStatusSetRequest } from 'api/types';

export type Props = {
  apartmentId: number;
};

export type SetApartmentStatusRequest = {
  apartmentId: number;
  requestPayload: ApartmentStatusSetRequest;
};
