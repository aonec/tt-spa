import { ApartmentStatusSetRequest } from "myApi";

export interface SetApartmentStatusRequest {
  apartmentId: number;
  requestPayload: ApartmentStatusSetRequest;
}
