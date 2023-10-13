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
  getErpExecutorsForLead,
  getLeadExecutors,
  getResourceDisconnection,
  getTaskReasons,
} from './addTaskFromDispatcherService.api';
import {
  ApartmentListResponse,
  ApartmentListResponsePagedList,
  ErpCreateTaskRequest,
  ErpExecutorResponse,
  ErpSourceResponse,
  ErpTaskReasonResponse,
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

const PageGate = createGate();
const AddTaskDataFetchGate = createGate();

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const choоseLeadExecutor = createEvent<string>();

const handleCreateTask = createEvent<AddTask>();

const handleSelectHousingAddress = createEvent<string>();
const handleSelectApartmentNumber = createEvent<string>();
const handleSelectTaskReason = createEvent<string>();

const setSelectedHousingId = createEvent<string | null>();
const setSelectedApartmentId = createEvent<number | null>();
const setSelectedTaskReasonId = createEvent<string | null>();

const handleReset = createEvent();

const createTaskFx = createEffect<
  ErpCreateTaskRequest,
  File | null,
  EffectFailDataAxiosError
>(createTask);

const getERPSourcesFx = createEffect<void, ErpSourceResponse[]>(getERPSources);

const getLeadExecutorsFx = createEffect<void, ErpExecutorResponse[]>(
  getLeadExecutors,
);

const getAddressesFx = createEffect<
  GetAddressesRequest,
  StreetWithBuildingNumbersResponsePagedList
>(getAddresses);

const getErpExecutorsForLeadFx = createEffect<
  { leadId: string },
  ErpExecutorResponse[]
>(getErpExecutorsForLead);

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

const getTaskReasonsFx = createEffect<void, ErpTaskReasonResponse[]>(
  getTaskReasons,
);

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(handleReset);

const $ERPSources = createStore<ErpSourceResponse[]>([])
  .on(getERPSourcesFx.doneData, (_, data) => data)

const $leadExecutors = createStore<ErpExecutorResponse[]>([])
  .on(getLeadExecutorsFx.doneData, (_, data) => data)

const $executors = createStore<ErpExecutorResponse[]>([])
  .on(getErpExecutorsForLeadFx.doneData, (_, data) => data)
  .reset(handleReset);

const $preparedForOptionsAddresses = createStore<PreparedAddress[]>([])
  .on(getAddressesFx.doneData, (_, data) =>
    prepareAddressesForTreeSelect(data.items),
  )

const $selectedHousingStockId = createStore<string | null>(null)
  .on(setSelectedHousingId, (_, id) => id)
  .reset(handleReset);

const $selectedApartmentId = createStore<number | null>(null)
  .on(setSelectedApartmentId, (_, id) => id)
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

const $resourceDisconnection = createStore<ResourceDisconnectingResponse[]>([])
  .on(getResourceDisconnectionFx.doneData, (_, data) => data.items || [])
  .reset(handleReset);

const $taskReasons = createStore<ErpTaskReasonResponse[]>([])
  .on(getTaskReasonsFx.doneData, (_, data) => data)

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

    return {
      taskReasonId: source.selectedTaskReasonId,
      taskType: data.taskType,
      objectTtmId: Number(source.selectedHousingStockId),
      sourceId: data.sourceId,
      sourceNumber: data.requestNumber,
      sourceDateTime: sourceDateTimeUTC,
      leadId: data.leadId,
      workerId: data.executorId,
      subscriberPhoneNumber: data.phoneNumber,
      subscriberFullName: data.subscriberName,
      taskDescription: data.taskDescription,
    } as ErpCreateTaskRequest;
  },
  target: createTaskFx,
});

sample({
  clock: AddTaskDataFetchGate.open,
  target: [getERPSourcesFx, getLeadExecutorsFx, getTaskReasonsFx],
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
    return selectedOption?.id || null;
  },
  target: setSelectedTaskReasonId,
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
    choоseLeadExecutor,
    handleSelectHousingAddress,
    handleSelectApartmentNumber,
    handleSelectTaskReason,
  },
  outputs: {
    $isModalOpen,
    $ERPSources,
    $leadExecutors,
    $preparedForOptionsAddresses,
    $executors,
    $isCreatePending,
    $preparedApartmentNumbers,
    $resourceDisconnection,
    $apartmentHomeownerNames,
    $taskReasons,
  },
  gates: { PageGate, AddTaskDataFetchGate },
};
