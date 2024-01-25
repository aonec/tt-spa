import {
  EisTaskType,
  HomeownerAccountReplaceAllPhoneNumbersRequest,
} from 'api/types';

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

export type HomeownerNameOption = {
  value: string;
  id: string;
};

export enum TaskTypes {
  Current = 'Current',
  Emergency = 'Emergency',
  Planned = 'Planned',
}

export type ReplaceAllPhonesRequestType = {
  homeownerAccountId: string;
  requestPayload: HomeownerAccountReplaceAllPhoneNumbersRequest;
};
