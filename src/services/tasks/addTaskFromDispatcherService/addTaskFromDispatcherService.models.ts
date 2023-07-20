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
  ErpCreateTaskRequest,
  ErpExecutorResponse,
  ErpObjectResponse,
  ErpSourceResponse,
  ErpTaskDeadlineResponse,
  ErpWorkCategoryResponse,
} from 'api/myApi';
import { createGate } from 'effector-react';
import { EffectFailDataAxiosError } from 'types';
import { AddTask } from './view/AddTaskModal/AddTaskForm/AddTaskForm.types';
import { GetTaskDeadlineRequest } from './addTaskFromDispatcherService.types';
import { message } from 'antd';

const domain = createDomain('addTaskFromDispatcherService');

const PageGate = createGate();

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const choоseLeadExecutor = domain.createEvent<string>();

const handleTaskDeadlineRequest = domain.createEvent<GetTaskDeadlineRequest>();
const resetDeadline = domain.createEvent();

const handleCreateTask = domain.createEvent<AddTask>();

const handleReset = domain.createEvent();

const createTaskFx = domain.createEffect<
  ErpCreateTaskRequest,
  File | null,
  EffectFailDataAxiosError
>(createTask);

const getERPSourcesFx = domain.createEffect<void, ErpSourceResponse[]>(
  getERPSources,
);

const getWorkCategoriesFx = domain.createEffect<
  void,
  ErpWorkCategoryResponse[]
>(getWorkCategories);

const getLeadExecutorsFx = domain.createEffect<void, ErpExecutorResponse[]>(
  getLeadExecutors,
);

const getErpObjectsFx = domain.createEffect<void, ErpObjectResponse[]>(
  getTasksErpObjects,
);

const getErpExecutorsForLeadFx = domain.createEffect<
  { leadId: string },
  ErpExecutorResponse[]
>(getErpExecutorsForLead);

const getErpTaskDeadlineFx = domain.createEffect<
  GetTaskDeadlineRequest,
  ErpTaskDeadlineResponse
>(getErpTaskDeadline);

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(handleReset);

const $ERPSources = domain
  .createStore<ErpSourceResponse[]>([])
  .on(getERPSourcesFx.doneData, (_, data) => data)
  .reset(handleReset);

const $workCategories = domain
  .createStore<ErpWorkCategoryResponse[]>([])
  .on(getWorkCategoriesFx.doneData, (_, data) => data)
  .reset(handleReset);

const $leadExecutors = domain
  .createStore<ErpExecutorResponse[]>([])
  .on(getLeadExecutorsFx.doneData, (_, data) => data)
  .reset(handleReset);

const $executors = domain
  .createStore<ErpExecutorResponse[]>([])
  .on(getErpExecutorsForLeadFx.doneData, (_, data) => data)
  .reset(handleReset);

const $ErpObjects = domain
  .createStore<ErpObjectResponse[]>([])
  .on(getErpObjectsFx.doneData, (_, data) => data)
  .reset(handleReset);

const $taskDeadlineRequest = domain
  .createStore<GetTaskDeadlineRequest | null>(null)
  .on(handleTaskDeadlineRequest, (prev, data) => ({ ...prev, ...data }))
  .reset(handleReset);

const $taskDeadline = domain
  .createStore<ErpTaskDeadlineResponse | null>(null)
  .on(getErpTaskDeadlineFx.doneData, (_, data) => data)
  .reset(resetDeadline)
  .reset(handleReset);

sample({
  clock: handleCreateTask,
  source: $ErpObjects,
  fn: (ErpObjects, data) => {
    const object = ErpObjects.find(
      (object) => object.address === data.selectedObjectAddress,
    );

    const sourceDateTime = data.requestDate
      ?.format('YYYY-MM-DD')
      .concat('T', data.requestTime || '');

    const manualTaskDeadline = data.manualDeadlineDate
      ?.format('YYYY-MM-DD')
      .concat('T', data.manualDeadlineTime || '');

    return {
      leadId: data.leadId,
      objectId: object?.id,
      sourceDateTime: sourceDateTime,
      sourceId: data.sourceId,
      sourceNumber: data.requestNumber,
      taskDescription: data.taskDescription,
      taskType: data.taskType,
      workCategoryId: data.workTypeId,
      subscriberFullName: data.subscriberName,
      subscriberPhoneNumber: data.phoneNumber,
      workerId: data.executorId,
      taskDeadline: data.taskDeadline || manualTaskDeadline,
    } as ErpCreateTaskRequest;
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
  clock: $taskDeadlineRequest,
  fn: (request) => request!,
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
    if (!request.isPermittedToRequest) {
      return false;
    }
    return true;
  },
  target: getErpTaskDeadlineFx,
});

sample({
  clock: $taskDeadlineRequest,
  filter: (request) => request?.isPermittedToRequest || false,
  target: resetDeadline,
});

const onSuccessCreation = createTaskFx.doneData;

const $isCreatePending = createTaskFx.pending;

sample({
  clock: onSuccessCreation,
  target: handleReset,
});

onSuccessCreation.watch(() => {
  message.success('Задача создана');
});

createTaskFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
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
    $isCreatePending,
  },
  gates: { PageGate },
};
