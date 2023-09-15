import { createDomain, sample } from 'effector';
import {
  createTask,
  getAddresses,
  getERPSources,
  getErpExecutorsForLead,
  getErpTaskDeadline,
  getLeadExecutors,
  getWorkCategories,
} from './addTaskFromDispatcherService.api';
import {
  ErpCreateTaskRequest,
  ErpExecutorResponse,
  ErpObjectResponse,
  ErpSourceResponse,
  ErpTaskDeadlineResponse,
  ErpWorkCategoryResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import { createGate } from 'effector-react';
import { EffectFailDataAxiosError } from 'types';
import { AddTask } from './view/AddTaskModal/AddTaskForm/AddTaskForm.types';
import {
  GetAddressesRequest,
  GetTaskDeadlineRequest,
  PreparedAddress,
} from './addTaskFromDispatcherService.types';
import { message } from 'antd';
import { currentUserService } from 'services/currentUserService';
import { prepareAddressesForTreeSelect } from './addTaskFromDispatcherService.utils';

const domain = createDomain('addTaskFromDispatcherService');

const PageGate = createGate();

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const choоseLeadExecutor = domain.createEvent<string>();

const handleTaskDeadlineRequest = domain.createEvent<GetTaskDeadlineRequest>();
const resetDeadline = domain.createEvent();

const handleCreateTask = domain.createEvent<AddTask>();

const handleSelectHousingAddress = domain.createEvent<string>();
const setSelectedHousingId = domain.createEvent<string | null>();

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

const getAddressesFx = domain.createEffect<
  GetAddressesRequest,
  StreetWithBuildingNumbersResponsePagedList
>(getAddresses);

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

const $preparedForOptionsAddresses = domain
  .createStore<PreparedAddress[]>([])
  .on(getAddressesFx.doneData, (_, data) =>
    prepareAddressesForTreeSelect(data.items),
  )
  .reset(handleReset);

const $selectedHousingStockId = domain
  .createStore<string | null>(null)
  .on(setSelectedHousingId, (_, id) => id);

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
  source: $selectedHousingStockId,
  fn: (selectedHousingStockId, data) => {
    const sourceDateTime = data.requestDate
      ?.format('YYYY-MM-DD')
      .concat('T', data.requestTime || '');

    const manualTaskDeadline = data.manualDeadlineDate
      ?.format('YYYY-MM-DD')
      .concat('T', data.manualDeadlineTime || '');

    return {
      leadId: data.leadId,
      objectId: selectedHousingStockId,
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

sample({
  clock: PageGate.open,
  target: [getERPSourcesFx, getWorkCategoriesFx, getLeadExecutorsFx],
});

sample({
  clock: PageGate.open,
  source: currentUserService.outputs.$userCity,
  filter: Boolean,
  fn: (userCity) => ({
    City: userCity,
  }),
  target: getAddressesFx,
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
  clock: handleSelectHousingAddress,
  source: $preparedForOptionsAddresses,
  fn: (optionAddresses, selectedAddress) => {
    const selectedOption = optionAddresses.find(
      (optionItem) => optionItem.address === selectedAddress,
    );
    return selectedOption?.id || null;
  },
  target: setSelectedHousingId,
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
    handleSelectHousingAddress,
  },
  outputs: {
    $isModalOpen,
    $ERPSources,
    $workCategories,
    $leadExecutors,
    $ErpObjects: $preparedForOptionsAddresses,
    $executors,
    $taskDeadlineRequest,
    $taskDeadline,
    $isCreatePending,
  },
  gates: { PageGate },
};
