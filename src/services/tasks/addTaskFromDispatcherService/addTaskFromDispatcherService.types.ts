import { EisTaskType } from 'api/types';

export type GetTaskDeadlineRequest = {
  WorkCategoryId?: string;
  TaskType?: EisTaskType;
  isPermittedToRequest: boolean;
};

export type GetApartmentsRequest = {
  HousingStockId: number;
};

export type GetResourceDisconnectionRequest = {
  BuildingId: number;
};

export type GetAddressesRequest = {
  City: string;
};

export type PreparedAddress = {
  id: string;
  address: string;
};

export type ExistingApartmentNumberType = {
  value: string;
  id: number;
};
