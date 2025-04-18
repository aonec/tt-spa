import { UpdateHouseManagementRequest } from 'api/types';

export type UpdateType = {
  houseManagementId: string;
  requestPayload: UpdateHouseManagementRequest;
};

export type OpenPayload = {
  id: string;
  name: string;
};
