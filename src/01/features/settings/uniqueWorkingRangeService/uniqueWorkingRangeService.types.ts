import { GetAddressesRequestPayload } from "services/objects/objectsProfileService/soiReportService/soiReportService.types";

export type GetAddressesWithCityRequestPayload = GetAddressesRequestPayload & {City: string}