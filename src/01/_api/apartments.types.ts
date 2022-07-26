import { ApartmentStatusSetRequest } from "../../api/types";

export interface SetApartmentStatusRequest {
  apartmentId: number;
  requestPayload: ApartmentStatusSetRequest;
}
