import { createDomain, forward } from 'effector';
import {
  createTask,
  getERPSources,
  getLeadExecutors,
  getTasksErpObjects,
  getWorkCategories,
} from './addTaskFromDispatcherService.api';
import {
  CreateErpTaskRequest,
  ExecutorGrpcModel,
  SourceGrpcModel,
  WorkCategoryGrpcModel,
} from 'myApi';
import { createGate } from 'effector-react';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('addTaskFromDispatcherService');

const PageGate = createGate();

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const createTaskFx = domain.createEffect<
  CreateErpTaskRequest,
  File | null,
  EffectFailDataAxiosError
>(createTask);

const getERPSourcesFx = domain.createEffect<void, SourceGrpcModel[]>(
  getERPSources,
);

const getWorkCategoriesFx = domain.createEffect<void, WorkCategoryGrpcModel[]>(
  getWorkCategories,
);

const getLeadExecutorsFx = domain.createEffect<void, ExecutorGrpcModel[]>(
  getLeadExecutors,
);

const getErpObjectsFx = domain.createEffect<void, ExecutorGrpcModel[]>(
  getTasksErpObjects,
);

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

const $ERPSources = domain
  .createStore<SourceGrpcModel[]>([])
  .on(getERPSourcesFx.doneData, (_, data) => data);

const $workCategories = domain
  .createStore<WorkCategoryGrpcModel[]>([])
  .on(getWorkCategoriesFx.doneData, (_, data) => data);

const $leadExecutors = domain
  .createStore<ExecutorGrpcModel[]>([])
  .on(getLeadExecutorsFx.doneData, (_, data) => data);

const $ErpObjects = domain
  .createStore<ExecutorGrpcModel[]>([])
  .on(getErpObjectsFx.doneData, (_, data) => data);

forward({
  from: PageGate.open,
  to: getERPSourcesFx,
});

forward({
  from: PageGate.open,
  to: getWorkCategoriesFx,
});

forward({
  from: PageGate.open,
  to: getLeadExecutorsFx,
});

forward({
  from: PageGate.open,
  to: getErpObjectsFx,
});

export const addTaskFromDispatcherService = {
  inputs: { handleOpenModal, handleCloseModal },
  outputs: {
    $isModalOpen,
    $ERPSources,
    $workCategories,
    $leadExecutors,
    $ErpObjects,
  },
  gates: { PageGate },
};
