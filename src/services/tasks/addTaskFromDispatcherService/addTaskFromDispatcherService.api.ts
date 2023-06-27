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

export const getERPSources = (): Promise<SourceGrpcModel[] | null> => {
  return axios.post('Tasks/ErpSources');
};

export const getWorkCategories = (): Promise<
  WorkCategoryGrpcModel[] | null
> => {
  return axios.post('Tasks/ErpWorkCategories');
};

export const getLeadExecutors = (): Promise<ExecutorGrpcModel[] | null> => {
  return axios.post('Tasks/ErpLeads');
};

export const getTasksErpObjects = (): Promise<ExecutorGrpcModel[] | null> => {
  return axios.post('Tasks/ErpObjects'); // поправят тип
};
