import { createDomain, forward, sample } from 'effector';
import {
  createTask,
  getERPSources,
  getErpExecutorsForLead,
  getErpTaskDeadline,
  getLeadExecutors,
  getTasksErpObjects,
  getWorkCategories,
} from './addTaskFromDispatcherService.api';
import {
  CreateErpTaskRequest,
  ExecutorGrpcModel,
  GetTaskDeadlineGrpcResponse,
  ObjectGrpcModel,
  SourceGrpcModel,
  WorkCategoryGrpcModel,
} from 'myApi';
import { createGate } from 'effector-react';
import { EffectFailDataAxiosError } from 'types';
import { AddTask } from './view/AddTaskModal/AddTaskForm/AddTaskForm.types';
import { GetTaskDeadlineRequest } from './addTaskFromDispatcherService.types';
import { prepareDataForCreateTask } from './addTaskFromDispatcherService.utils';

const domain = createDomain('addTaskFromDispatcherService');

const PageGate = createGate();

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const choоseLeadExecutor = domain.createEvent<string>();

const handleTaskDeadlineRequest = domain.createEvent<GetTaskDeadlineRequest>();
const resetDeadline = domain.createEvent();

const handleCreateTask = domain.createEvent<AddTask>();

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

const getErpObjectsFx = domain.createEffect<void, ObjectGrpcModel[]>(
  getTasksErpObjects,
);

const getErpExecutorsForLeadFx = domain.createEffect<
  { leadId: string },
  ExecutorGrpcModel[]
>(getErpExecutorsForLead);

const getErpTaskDeadlineFx = domain.createEffect<
  GetTaskDeadlineRequest,
  GetTaskDeadlineGrpcResponse
>(getErpTaskDeadline);

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

const $executors = domain
  .createStore<ExecutorGrpcModel[]>([])
  .on(getErpExecutorsForLeadFx.doneData, (_, data) => data);

const $ErpObjects = domain
  .createStore<ObjectGrpcModel[]>([])
  .on(getErpObjectsFx.doneData, (_, data) => data);

const $taskDeadlineRequest = domain
  .createStore<GetTaskDeadlineRequest | null>(null)
  .on(handleTaskDeadlineRequest, (prev, data) => ({ ...prev, ...data }));

const $taskDeadline = domain
  .createStore<GetTaskDeadlineGrpcResponse | null>(null)
  .on(getErpTaskDeadlineFx.doneData, (_, data) => data)
  .reset(resetDeadline);

sample({
  clock: handleCreateTask,
  source: $ErpObjects,
  fn: (ErpObjects, data) => prepareDataForCreateTask(ErpObjects, data),
  target: createTaskFx,
});

forward({
  from: PageGate.open,
  to: [
    getERPSourcesFx,
    getWorkCategoriesFx,
    getLeadExecutorsFx,
    getErpObjectsFx,
  ],
});

sample({
  clock: choоseLeadExecutor,
  filter: Boolean,
  fn: (data) => {
    return {
      leadId: data,
    };
  },
  target: getErpExecutorsForLeadFx,
});

sample({
  clock: $taskDeadlineRequest.updates,
  source: $taskDeadlineRequest,
  filter: (request) => {
    if (!request) {
      return false;
    }
    if (!Boolean(request.TaskType)) {
      return false;
    }
    if (!Boolean(request.WorkCategoryId)) {
      return false;
    }
    if (
      request.WorkCategoryId === '48eb4f62-15a1-11e9-8176-001dd8b88b72' ||
      request.WorkCategoryId === '6373ec3b-302b-11e9-8184-001dd8b88b72'
    ) {
      return false;
    }
    return true;
  },
  target: getErpTaskDeadlineFx as any,
});

sample({
  clock: $taskDeadlineRequest.updates,
  source: $taskDeadlineRequest,
  filter: (data) => {
    return (
      data?.WorkCategoryId ===
      ('48eb4f62-15a1-11e9-8176-001dd8b88b72' ||
        '6373ec3b-302b-11e9-8184-001dd8b88b72')
    );
  },
  target: resetDeadline,
});

export const addTaskFromDispatcherService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    handleCreateTask,
    choоseLeadExecutor,
    handleTaskDeadlineRequest,
  },
  outputs: {
    $isModalOpen,
    $ERPSources,
    $workCategories,
    $leadExecutors,
    $ErpObjects,
    $executors,
    $taskDeadlineRequest,
    $taskDeadline,
  },
  gates: { PageGate },
};
