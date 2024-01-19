import { axios } from 'api/axios';
import {
  ApartmentListResponsePagedList,
  EResourceDisconnectingStatus,
  ErpCreateTaskRequest,
  ErpSourceResponse,
  ErpTaskDeadlineResponse,
  ErpTaskReasonGroupResponse,
  HomeownerAccountAddPhoneNumberRequest,
  HomeownerAccountResponse,
  ResourceDisconnectingResponsePagedList,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import {
  AddPhoneRequestType,
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

export const getERPSources = (): Promise<ErpSourceResponse[]> => {
  return axios.get('Tasks/ErpSources');
};

export const getErpTaskDeadline = (
  TaskReasonId: string,
): Promise<ErpTaskDeadlineResponse> => {
  return axios.get('Tasks/ErpTaskDeadline', { params: { TaskReasonId } });
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
): Promise<string[]> => {
  return axios.get(`Apartments/${apartmentId}/HomeownerAccountNames`, {
    params: { isAlsoClosed: true },
  });
};

export const getHomeownerAccounts = (
  apartmentId: number,
): Promise<HomeownerAccountResponse[]> => {
  return axios.get(`Apartments/${apartmentId}/HomeownerAccounts`, {
    params: { IsClosed: true },
  });
};

export const addPhone = ({
  homeownerAccountId,
  requestPayload,
}: AddPhoneRequestType): Promise<File | null> => {
  return axios.post(
    `HomeownerAccounts/${homeownerAccountId}/AddPhone`,
    requestPayload,
  );
};

export const replaceAllPhones = ({
  homeownerAccountId,
  requestPayload,
}: ReplaceAllPhonesRequestType): Promise<File | null> => {
  return axios.post(
    `HomeownerAccounts/${homeownerAccountId}/ReplaceAllPhones`,
    requestPayload,
  );
};
