import { axios } from 'api/axios';
import {
  ApartmentListResponsePagedList,
  EResourceDisconnectingStatus,
  ErpCreateTaskRequest,
  ErpSourceResponse,
  ErpTaskReasonGroupResponse,
  ResourceDisconnectingResponsePagedList,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import {
  GetAddressesRequest,
  GetApartmentsRequest,
  GetResourceDisconnectionRequest,
} from './addTaskFromDispatcherService.types';

export const createTask = (
  requestPayload: ErpCreateTaskRequest,
): Promise<File | null> => {
  return axios.post('Tasks/ErpCreateTask', requestPayload);
};

export const getERPSources = (): Promise<ErpSourceResponse[]> => {
  return axios.get('Tasks/ErpSources');
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
