import { createDomain, sample } from 'effector';
import {
  createTask,
  getAddresses,
  getApartmentHomeownerNames,
  getApartments,
  getERPSources,
  getErpExecutorsForLead,
  getErpTaskDeadline,
  getLeadExecutors,
  getResourceDisconnection,
  getWorkCategories,
} from './addTaskFromDispatcherService.api';
import {
  ApartmentListResponsePagedList,
  ErpCreateTaskRequest,
  ErpExecutorResponse,
  ErpSourceResponse,
  ErpTaskDeadlineResponse,
  ErpWorkCategoryResponse,
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
  GetTaskDeadlineRequest,
  HomeownerNameOption,
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
const handleSelectApartmentNumber = domain.createEvent<string>();
const setSelectedHousingId = domain.createEvent<string | null>();
const setSelectedApartmentId = domain.createEvent<number | null>();

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

const $selectedApartmentId = domain
  .createStore<number | null>(null)
  .on(setSelectedApartmentId, (_, id) => id);

const $apartmentHomeownerNames = domain
  .createStore<HomeownerNameOption[]>([])
  .on(getApartmentHomeownerNamesFx.doneData, (_, data) =>
    data.map((name) => ({ value: name })),
  );

const $taskDeadlineRequest = domain
  .createStore<GetTaskDeadlineRequest | null>(null)
  .on(handleTaskDeadlineRequest, (prev, data) => ({ ...prev, ...data }))
  .reset(handleReset);

const $taskDeadline = domain
  .createStore<ErpTaskDeadlineResponse | null>(null)
  .on(getErpTaskDeadlineFx.doneData, (_, data) => data)
  .reset(resetDeadline)
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
  });

const $resourceDisconnection = domain
  .createStore<ResourceDisconnectingResponse[]>([])
  .on(getResourceDisconnectionFx.doneData, (_, data) => data.items || [])
  .reset(handleReset);

sample({
  clock: handleCreateTask,
  source: $selectedHousingStockId,
  filter: (selectedHousingStockId) => Boolean(selectedHousingStockId),
  fn: (selectedHousingStockId, data) => {
    const sourceDateTime = data.requestDate
      ?.format('YYYY-MM-DD')
      .concat('T', data.requestTime || '');

    return {
      taskReasonId: '',
      taskType: data.taskType,
      objectTtmId: Number(selectedHousingStockId),
      sourceId: data.sourceId,
      sourceNumber: data.requestNumber,
      sourceDateTime: sourceDateTime,
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
    handleTaskDeadlineRequest,
    handleSelectHousingAddress,
    handleSelectApartmentNumber,
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
    $existingApartmentNumbers,
    $resourceDisconnection,
    $apartmentHomeownerNames,
  },
  gates: { PageGate },
};
