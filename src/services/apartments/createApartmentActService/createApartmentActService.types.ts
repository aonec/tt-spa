import { AddApartmentActRequest } from "../../../api/types";

export type CreateActFormPayload = Omit<
  AddApartmentActRequest,
  'apartmentId'
>;
