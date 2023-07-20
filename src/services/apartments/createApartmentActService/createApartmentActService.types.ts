import { AddApartmentActRequest } from 'api/myApi';

export type CreateActFormPayload = Omit<AddApartmentActRequest, 'apartmentId'>;
