import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { createGate } from 'effector-react';
import dayjs from 'dayjs';
import { message } from 'antd';
import {
  createTask,
  getAddresses,
  getApartmentHomeownerNames,
  getApartments,
  getERPSources,
  getErpTaskDeadline,
  getResourceDisconnection,
  getTaskReasons,
} from './addTaskFromDispatcherService.api';
import {
  ApartmentListResponse,
  ApartmentListResponsePagedList,
  EisTaskType,
  ErpCreateTaskRequest,
  ErpSourceResponse,
  ErpTaskDeadlineResponse,
  ErpTaskReasonGroupResponse,
  ErpTaskReasonItemResponse,
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { AddTask } from './view/AddTaskModal/AddTaskForm/AddTaskForm.types';
import {
  GetAddressesRequest,
  GetApartmentsRequest,
  GetResourceDisconnectionRequest,
  HomeownerNameOption,
  PreparedAddress,
} from './addTaskFromDispatcherService.types';
import { currentUserService } from 'services/currentUserService';
import { prepareAddressesForTreeSelect } from './addTaskFromDispatcherService.utils';
import _ from 'lodash';

const PageGate = createGate();
const AddTaskDataFetchGate = createGate();

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const handleCreateTask = createEvent<AddTask>();

const handleSelectHousingAddress = createEvent<string>();
const handleSelectApartmentNumber = createEvent<string>();
const handleSelectTaskReason = createEvent<string>();
const handleSelectTaskType = createEvent<EisTaskType>();

const setSelectedHousingId = createEvent<string | null>();
const setSelectedApartmentId = createEvent<number | null>();
const setSelectedTaskReasonOption = createEvent<ErpTaskReasonItemResponse[]>();
const setSelectedTaskReasonId = createEvent<string | null>();

const handleReset = createEvent();

const createTaskFx = createEffect<
  ErpCreateTaskRequest,
  File | null,
  EffectFailDataAxiosError
>(createTask);

const getERPSourcesFx = createEffect<void, ErpSourceResponse[]>(getERPSources);

const getTaskReasonsFx = createEffect<void, ErpTaskReasonGroupResponse[]>(
  getTaskReasons,
);

const getErpTaskDeadlineFx = createEffect<string, ErpTaskDeadlineResponse>(
  getErpTaskDeadline,
);

const getAddressesFx = createEffect<
  GetAddressesRequest,
  StreetWithBuildingNumbersResponsePagedList
>(getAddresses);

const getApartmentsFx = createEffect<
  GetApartmentsRequest,
  ApartmentListResponsePagedList
>(getApartments);

const getApartmentHomeownerNamesFx = createEffect<number, string[]>(
  getApartmentHomeownerNames,
);

const getResourceDisconnectionFx = createEffect<
  GetResourceDisconnectionRequest,
  ResourceDisconnectingResponsePagedList
>(getResourceDisconnection);

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(handleReset);

const $ERPSources = createStore<ErpSourceResponse[]>([]).on(
  getERPSourcesFx.doneData,
  (_, data) => data,
);

const $taskReasons = createStore<ErpTaskReasonGroupResponse[]>([]).on(
  getTaskReasonsFx.doneData,
  (_, data) => data,
);
const $isManualDeadlineRequired = createStore<boolean>(false)
  .on(getErpTaskDeadlineFx.doneData, (_, data) => !data.deadlineInHours)
  .reset([handleReset, handleSelectTaskType, handleSelectTaskReason]);

const $resourceDisconnection = createStore<ResourceDisconnectingResponse[]>([])
  .on(getResourceDisconnectionFx.doneData, (_, data) => data.items || [])
  .reset(handleReset);

const $preparedForOptionsAddresses = createStore<PreparedAddress[]>([]).on(
  getAddressesFx.doneData,
  (_, data) => prepareAddressesForTreeSelect(data.items),
);

const $selectedHousingStockId = createStore<string | null>(null)
  .on(setSelectedHousingId, (_, id) => id)
  .reset(handleReset);

const $selectedApartmentId = createStore<number | null>(null)
  .on(setSelectedApartmentId, (_, id) => id)
  .reset(handleReset);

const $selectedTaskReasonOption = createStore<ErpTaskReasonItemResponse[]>([])
  .on(setSelectedTaskReasonOption, (_, taskReasonOption) => taskReasonOption)
  .reset(handleReset);

const $selectedTaskReasonId = createStore<string | null>(null)
  .on(setSelectedTaskReasonId, (_, id) => id)
  .reset(handleReset);

const $apartmentHomeownerNames = createStore<HomeownerNameOption[]>([])
  .on(getApartmentHomeownerNamesFx.doneData, (_, data) =>
    data.map((name) => ({ value: name })),
  )
  .reset(handleReset);

const $existingApartmentNumbers = createStore<ApartmentListResponse[]>([])
  .on(getApartmentsFx.doneData, (_, { items }) => items || [])
  .reset(handleReset);

const $preparedApartmentNumbers = $existingApartmentNumbers.map((items) => {
  return items
    .filter((apartment) => Boolean(apartment.apartmentNumber))
    .map((apartment) => ({
      value: apartment.apartmentNumber as string,
      id: apartment.id,
    }));
});

sample({
  clock: handleCreateTask,
  source: combine(
    $selectedHousingStockId,
    $selectedTaskReasonId,
    (selectedHousingStockId, selectedTaskReasonId) => ({
      selectedHousingStockId,
      selectedTaskReasonId,
    }),
  ),
  fn: (source, data) => {
    const sourceDateTime = data.requestDate
      ?.format('YYYY-MM-DD')
      .concat('T', data.requestTime?.format('HH:mm') || '');

    const sourceDateTimeUTC = dayjs(sourceDateTime).utcOffset(0).toISOString();

    const deadlineDateTime = data.taskDeadlineDate
      ?.format('YYYY-MM-DD')
      .concat('T', data.taskDeadlineTime?.format('HH:mm') || '');

    const deadlineDateTimeUTC = data.taskDeadlineDate
      ? dayjs(deadlineDateTime).utcOffset(0).toISOString()
      : null;

    const payload = {
      taskReasonId: source.selectedTaskReasonId,
      taskType: data.taskType,
      objectTtmId: Number(source.selectedHousingStockId),
      sourceId: data.sourceId,
      sourceNumber: data.requestNumber,
      sourceDateTime: sourceDateTimeUTC,
      subscriberPhoneNumber: data.phoneNumber,
      subscriberFullName: data.subscriberName,
      taskDescription: data.taskDescription,
      taskDeadline: deadlineDateTimeUTC,
    } as ErpCreateTaskRequest;

    const filteredByNullValuesPayload = _.pickBy(payload, _.identity);

    return filteredByNullValuesPayload as ErpCreateTaskRequest;
  },
  target: createTaskFx,
});

sample({
  clock: AddTaskDataFetchGate.open,
  target: [getERPSourcesFx, getTaskReasonsFx],
});

sample({
  clock: AddTaskDataFetchGate.open,
  source: currentUserService.outputs.$userCity,
  filter: Boolean,
  fn: (userCity) => ({
    City: userCity,
  }),
  target: getAddressesFx,
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

sample({
  clock: handleSelectApartmentNumber,
  source: $preparedApartmentNumbers,
  fn: (apartmentOptions, selectedApartNumber) => {
    const selectedOption = apartmentOptions.find(
      (optionItem) => optionItem.value === selectedApartNumber,
    );
    return selectedOption?.id || null;
  },
  target: setSelectedApartmentId,
});

sample({
  clock: handleSelectTaskReason,
  source: $taskReasons,
  fn: (taskReasons, selectedTaskReason) => {
    const selectedOption = taskReasons.find(
      (optionItem) => optionItem.name === selectedTaskReason,
    );
    return selectedOption?.items || [];
  },
  target: setSelectedTaskReasonOption,
});

sample({
  clock: handleSelectTaskType,
  source: $selectedTaskReasonOption,
  fn: (taskReason, selectedTaskType) => {
    const taskReasonFromTaskType = taskReason.find(
      (taskReasonItem) => taskReasonItem.taskType === selectedTaskType,
    );
    return taskReasonFromTaskType?.id || null;
  },
  target: [setSelectedTaskReasonId, getErpTaskDeadlineFx],
});

sample({
  clock: $selectedHousingStockId,
  filter: Boolean,
  fn: (housingStockId) => ({ HousingStockId: Number(housingStockId) }),
  target: getApartmentsFx,
});

sample({
  clock: $selectedHousingStockId,
  filter: Boolean,
  fn: (housingStockId) => ({ BuildingId: Number(housingStockId) }),
  target: getResourceDisconnectionFx,
});

sample({
  clock: $selectedApartmentId,
  filter: Boolean,
  target: getApartmentHomeownerNamesFx,
});

const onSuccessCreation = createTaskFx.doneData;

const $isCreatePending = createTaskFx.pending;

sample({
  clock: [onSuccessCreation, PageGate.close],
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
    handleSelectHousingAddress,
    handleSelectApartmentNumber,
    handleSelectTaskReason,
    handleSelectTaskType,
  },
  outputs: {
    $isModalOpen,
    $ERPSources,
    $preparedForOptionsAddresses,
    $isCreatePending,
    $preparedApartmentNumbers,
    $resourceDisconnection,
    $apartmentHomeownerNames,
    $taskReasons,
    $selectedTaskReasonOption,
    $isManualDeadlineRequired,
  },
  gates: { PageGate, AddTaskDataFetchGate },
};
