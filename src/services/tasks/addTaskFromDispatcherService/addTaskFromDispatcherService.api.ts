import { axios } from '01/axios';
import {
  CreateErpTaskRequest,
  ExecutorGrpcModel,
  SourceGrpcModel,
  WorkCategoryGrpcModel,
} from 'myApi';

export const createTask = (
  requestPayload: CreateErpTaskRequest,
): Promise<File | null> => {
  return axios.post('Tasks/ErpCreateTask', requestPayload);
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

export const getTasksErpObjects = (): Promise<ExecutorGrpcModel[]> => {
  return axios.get('Tasks/ErpObjects'); // поправят тип
};
