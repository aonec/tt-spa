import { axios } from "../../api/axios";
import {
  CreateHousingMeteringDeviceReadingsRequest,
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsResponse,
  UpdateHousingMeteringDeviceReadingsRequest,
} from "../../api/types";

export const requestReadings = (query: {
  nodeId?: number;
}): Promise<GetHousingMeteringDeviceReadingsResponse> => {
  return axios.get("HousingMeteringDeviceReadings", {
    params: query,
  });
};

export const postReading = (
  query: CreateHousingMeteringDeviceReadingsRequest
): Promise<HousingMeteringDeviceReadingsResponse> =>
  axios.post("housingMeteringDeviceReadings/CreateOrUpdateLast", query);

export const updateReading = (
  query: UpdateHousingMeteringDeviceReadingsRequest
): Promise<HousingMeteringDeviceReadingsResponse> =>
  axios.put("HousingMeteringDeviceReadings", query);
