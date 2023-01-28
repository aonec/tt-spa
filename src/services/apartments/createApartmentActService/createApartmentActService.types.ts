import { AddApartmentActRequest } from 'myApi';

export type CreateActFormPayload = Omit<
  AddApartmentActRequest,
  'apartmentId'
>;
