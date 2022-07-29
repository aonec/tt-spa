import { UpdateApartmentActRequest } from "../../../api/types";

export type EditActFormPayload = Omit<UpdateApartmentActRequest, 'apartmentId'>;

export type EditActRequestPayload = {
    act: EditActFormPayload;
    actId: number;
}