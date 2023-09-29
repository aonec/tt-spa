import { combine, createDomain, sample } from 'effector';
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
  ApartmentListResponsePagedList,
  ErpCreateTaskRequest,
  ErpExecutorResponse,
  ErpSourceResponse,
  ErpTaskReasonResponse,
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import { createGate } from 'effector-react';
import { EffectFailDataAxiosError } from 'types';
import { AddTask } from './view/AddTaskModal/AddTaskForm/AddTaskForm.types';
import {
  ExistingApartmentNumberType,
  GetAddressesRequest,
  GetApartmentsRequest,
  GetResourceDisconnectionRequest,
  HomeownerNameOption,
  PreparedAddress,
} from './addTaskFromDispatcherService.types';
import { message } from 'antd';
import { currentUserService } from 'services/currentUserService';
import { prepareAddressesForTreeSelect } from './addTaskFromDispatcherService.utils';
import dayjs from 'dayjs';

const domain = createDomain('addTaskFromDispatcherService');

const PageGate = createGate();

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const choоseLeadExecutor = domain.createEvent<string>();

const handleCreateTask = domain.createEvent<AddTask>();

const handleSelectHousingAddress = domain.createEvent<string>();
const handleSelectApartmentNumber = domain.createEvent<string>();
const handleSelectTaskReason = domain.createEvent<string>();

const setSelectedHousingId = domain.createEvent<string | null>();
const setSelectedApartmentId = domain.createEvent<number | null>();
const setSelectedTaskReasonId = domain.createEvent<string | null>();

const handleReset = domain.createEvent();

const createTaskFx = domain.createEffect<
  ErpCreateTaskRequest,
  File | null,
  EffectFailDataAxiosError
>(createTask);

const getERPSourcesFx = domain.createEffect<void, ErpSourceResponse[]>(
  getERPSources,
);

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

const getApartmentsFx = domain.createEffect<
  GetApartmentsRequest,
  ApartmentListResponsePagedList
>(getApartments);

const getApartmentHomeownerNamesFx = domain.createEffect<number, string[]>(
  getApartmentHomeownerNames,
);

const getResourceDisconnectionFx = domain.createEffect<
  GetResourceDisconnectionRequest,
  ResourceDisconnectingResponsePagedList
>(getResourceDisconnection);

const getTaskReasonsFx = domain.createEffect<void, ErpTaskReasonResponse[]>(
  getTaskReasons,
);

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(handleReset);

const $ERPSources = domain
  .createStore<ErpSourceResponse[]>([])
  .on(getERPSourcesFx.doneData, (_, data) => data)
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
  .on(setSelectedHousingId, (_, id) => id)
  .reset(handleReset);

const $selectedApartmentId = domain
  .createStore<number | null>(null)
  .on(setSelectedApartmentId, (_, id) => id)
  .reset(handleReset);

const $selectedTaskReasonId = domain
  .createStore<string | null>(null)
  .on(setSelectedTaskReasonId, (_, id) => id)
  .reset(handleReset);

const $apartmentHomeownerNames = domain
  .createStore<HomeownerNameOption[]>([])
  .on(getApartmentHomeownerNamesFx.doneData, (_, data) =>
    data.map((name) => ({ value: name })),
  )
  .reset(handleReset);

const $existingApartmentNumbers = domain
  .createStore<ExistingApartmentNumberType[]>([])
  .on(getApartmentsFx.doneData, (_, { items }) => {
    if (!items) return [];
    return items
      .filter((apartment) => Boolean(apartment.apartmentNumber))
      .map((apartment) => ({
        value: apartment.apartmentNumber as string,
        id: apartment.id,
      }));
  })
  .reset(handleReset);

const $resourceDisconnection = domain
  .createStore<ResourceDisconnectingResponse[]>([])
  .on(getResourceDisconnectionFx.doneData, (_, data) => data.items || [])
  .reset(handleReset);

const $taskReasons = domain
  .createStore<ErpTaskReasonResponse[]>([])
  .on(getTaskReasonsFx.doneData, (_, data) => data)
  .reset(handleReset);

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
      .concat('T', data.requestTime || '');

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
  clock: PageGate.open,
  target: [getERPSourcesFx, getLeadExecutorsFx, getTaskReasonsFx],
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

sample({
  clock: handleSelectApartmentNumber,
  source: $existingApartmentNumbers,
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
    $existingApartmentNumbers,
    $resourceDisconnection,
    $apartmentHomeownerNames,
    $taskReasons,
  },
  gates: { PageGate },
};
