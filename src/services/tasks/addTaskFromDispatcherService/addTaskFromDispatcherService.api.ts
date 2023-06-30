import { axios } from '01/axios';
import {
  CreateErpTaskRequest,
  ExecutorGrpcModel,
  GetTaskDeadlineGrpcResponse,
  GetTaskDeadlineRequest,
  ObjectGrpcModel,
  SourceGrpcModel,
  WorkCategoryGrpcModel,
} from 'myApi';
import queryString from 'query-string';

export const createTask = (
  requestPayload: CreateErpTaskRequest,
): Promise<File | null> => {
  return axios.post('Tasks/ErpCreateTask', { requestPayload });
};

export const getERPSources = (): Promise<SourceGrpcModel[]> => {
  return axios.get('Tasks/ErpSources');
};

export const getWorkCategories = (): Promise<WorkCategoryGrpcModel[]> => {
  return axios.get('Tasks/ErpWorkCategories');
};

export const getLeadExecutors = (): Promise<ExecutorGrpcModel[]> => {
  return axios.get('Tasks/ErpLeads');
};

export const getTasksErpObjects = (): Promise<ObjectGrpcModel[]> => {
  return axios.get('Tasks/ErpObjects');
};

export const getErpExecutorsForLead = (params: {
  leadId: string;
}): Promise<ExecutorGrpcModel[]> => {
  return axios.get('Tasks/ErpExecutorsForLead', {
    params,
    paramsSerializer: queryString.stringify,
  });
};

export const getErpTaskDeadline = (
  params: GetTaskDeadlineRequest,
): Promise<GetTaskDeadlineGrpcResponse[]> => {
  return axios.get('Tasks/ErpTaskDeadline', {
    params,
    paramsSerializer: queryString.stringify,
  });
};
