import { UpdateApartmentActRequest } from 'api/myApi';

export type EditActFormPayload = Omit<UpdateApartmentActRequest, 'apartmentId'>;

export type EditActRequestPayload = {
  act: EditActFormPayload;
  actId: number;
};
