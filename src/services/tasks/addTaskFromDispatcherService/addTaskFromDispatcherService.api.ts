import { axios } from 'api/axios';
import {
  ApartmentListResponsePagedList,
  EResourceDisconnectingStatus,
  ErpCreateTaskRequest,
  ErpExecutorResponse,
  ErpSourceResponse,
  ErpTaskDeadlineResponse,
  ErpTaskReasonGroupResponse,
  HomeownerAccountNameResponse,
  ResourceDisconnectingResponsePagedList,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import {
  DeadlineRequest,
  ExecutorsListRequest,
  GetAddressesRequest,
  GetApartmentsRequest,
  GetResourceDisconnectionRequest,
  ReplaceAllPhonesRequestType,
} from './addTaskFromDispatcherService.types';

export const createTask = (
  requestPayload: ErpCreateTaskRequest,
): Promise<File | null> => {
  return axios.post('Tasks/ErpCreateTask', requestPayload);
};

export const getErpTaskDeadline = (
  request: DeadlineRequest,
): Promise<ErpTaskDeadlineResponse> => {
  return axios.get('Tasks/ErpTaskDeadline', { params: request });
};

export const getERPSources = (): Promise<ErpSourceResponse[]> => {
  return axios.get('Tasks/ErpSources');
};

export const getExecutorsList = (
  request: ExecutorsListRequest,
): Promise<ErpExecutorResponse[]> => {
  return axios.get('Tasks/ErpTaskExecutors', { params: request });
};

export const getTaskReasons = (): Promise<ErpTaskReasonGroupResponse[]> => {
  return axios.get('Tasks/ErpTaskReasons');
};

export const getResourceDisconnection = (
  params: GetResourceDisconnectionRequest,
): Promise<ResourceDisconnectingResponsePagedList> => {
  return axios.get('ResourceDisconnecting', {
    params: { ...params, Status: EResourceDisconnectingStatus.Active },
  });
};

export const getApartments = (
  params: GetApartmentsRequest,
): Promise<ApartmentListResponsePagedList> => {
  return axios.get('Apartments', {
    params,
  });
};

export const getAddresses = (
  params: GetAddressesRequest,
): Promise<StreetWithBuildingNumbersResponsePagedList> => {
  return axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params,
  });
};

export const getApartmentHomeownerNames = (
  apartmentId: number,
): Promise<HomeownerAccountNameResponse[]> => {
  return axios.get(`Apartments/${apartmentId}/HomeownerAccountNames`, {
    params: { isAlsoClosed: false },
  });
};

export const replaceAllPhones = ({
  homeownerAccountId,
  requestPayload,
}: ReplaceAllPhonesRequestType): Promise<void> => {
  return axios.post(
    `HomeownerAccounts/${homeownerAccountId}/ReplaceAllPhones`,
    requestPayload,
  );
};
