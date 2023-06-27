import { createDomain, forward, sample } from 'effector';
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
import { AddTask } from './view/AddTaskModal/AddTaskForm/AddTaskForm.types';

const domain = createDomain('addTaskFromDispatcherService');

const PageGate = createGate();

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

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
  inputs: { handleOpenModal, handleCloseModal, handleCreateTask },
  outputs: {
    $isModalOpen,
    $ERPSources,
    $workCategories,
    $leadExecutors,
    $ErpObjects,
  },
  gates: { PageGate },
};
