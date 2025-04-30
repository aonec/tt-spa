import { axios } from 'api/axios';
import { HouseManagementResponse } from 'api/types';
import { UpdateType } from './updateHouseManagementService.types';

export const updateHouseManagement = (
  payload: UpdateType,
): Promise<HouseManagementResponse | null> => {
  return axios.post(
    `HouseManagements/${payload.houseManagementId}`,
    payload.requestPayload,
  );
};
