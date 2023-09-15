import { axios } from 'api/axios';
import {
  ErpCreateTaskRequest,
  ErpExecutorResponse,
  ErpObjectResponse,
  ErpSourceResponse,
  ErpTaskDeadlineResponse,
  ErpWorkCategoryResponse,
  ResourceDisconnectingResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import queryString from 'query-string';
import {
  GetAddressesRequest,
  GetApartmentsRequest,
  GetTaskDeadlineRequest,
} from './addTaskFromDispatcherService.types';

export const createTask = (
  requestPayload: ErpCreateTaskRequest,
): Promise<File | null> => {
  return axios.post('Tasks/ErpCreateTask', requestPayload);
};

export const getERPSources = (): Promise<ErpSourceResponse[]> => {
  return axios.get('Tasks/ErpSources');
};

export const getWorkCategories = (): Promise<ErpWorkCategoryResponse[]> => {
  return axios.get('Tasks/ErpWorkCategories');
};

export const getLeadExecutors = (): Promise<ErpExecutorResponse[]> => {
  return axios.get('Tasks/ErpLeads');
};

// export const getTasksErpObjects = (): Promise<ErpObjectResponse[]> => {
//   return axios.get('Tasks/ErpObjects');
// };

export const getErpExecutorsForLead = (params: {
  leadId: string;
}): Promise<ErpExecutorResponse[]> => {
  return axios.get('Tasks/ErpExecutorsForLead', {
    params,
    paramsSerializer: queryString.stringify,
  });
};

export const getErpTaskDeadline = (
  params: GetTaskDeadlineRequest,
): Promise<ErpTaskDeadlineResponse> => {
  return axios.get('Tasks/ErpTaskDeadline', {
    params,
    paramsSerializer: queryString.stringify,
  });
};

export const getResourceDisconnection = (
  buildingId: string,
): Promise<ResourceDisconnectingResponse> => {
  return axios.get(`ResourceDisconnecting/${buildingId}`);
};

export const getApartments = (
  params: GetApartmentsRequest,
): Promise<ResourceDisconnectingResponse> => {
  return axios.get('Apartments', {
    params,
    paramsSerializer: queryString.stringify,
  });
};

export const getAddresses = (
  params: GetAddressesRequest,
): Promise<StreetWithBuildingNumbersResponsePagedList> => {
  return axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params,
  });
};
