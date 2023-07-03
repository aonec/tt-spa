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
  GetTaskDeadlineRequest,
  SourceGrpcModel,
  WorkCategoryGrpcModel,
} from 'myApi';
import { createGate } from 'effector-react';
import { EffectFailDataAxiosError } from 'types';
import { AddTask } from './view/AddTaskModal/AddTaskForm/AddTaskForm.types';

const domain = createDomain('addTaskFromDispatcherService');

const PageGate = createGate();

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const choоseLeadExecutor = domain.createEvent<string>();

const handleTaskDeadlineRequest = domain.createEvent<GetTaskDeadlineRequest>();

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

const getErpObjectsFx = domain.createEffect<void, ExecutorGrpcModel[]>(
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
  .createStore<ExecutorGrpcModel[]>([])
  .on(getErpObjectsFx.doneData, (_, data) => data);

const $chosenLeadExecutorId = domain.createStore<string | null>(null);

const $taskDeadlineRequest = domain
  .createStore<GetTaskDeadlineRequest | null>(null)
  .on(handleTaskDeadlineRequest, (prev, data) => ({ ...prev, ...data }));

const $taskDeadline = domain
  .createStore<GetTaskDeadlineGrpcResponse | null>(null)
  .on(getErpTaskDeadlineFx.doneData, (_, data) => data);

sample({
  clock: handleCreateTask,
  source: $ErpObjects,
  fn: (ErpObjects, data) => {
    const object = ErpObjects.find(
      (object) => object.name === data.selectedObjectAddress,
    );

    const sourceDateTime = data.requestDate
      ?.format('YYYY-MM-DD')
      .concat('T', data.requestTime || '');

    return {
      leadId: data.leadId,
      objectId: object?.id,
      sourceDateTime: sourceDateTime,
      sourceId: data.sourceId,
      sourceNumber: data.requestNumber,
      taskDescription: data.taskDescription,
      taskType: data.taskType,
      workCategoryId: data.workTypeId,
    } as CreateErpTaskRequest;
  },
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
    if (!Boolean(request)) {
      return false;
    }
    if (!Boolean(request?.taskType)) {
      return false;
    }
    if (!Boolean(request?.workCategoryId)) {
      return false;
    }
    return true;
  },
  target: getErpTaskDeadlineFx as any,
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
    $taskDeadline
  },
  gates: { PageGate },
};
