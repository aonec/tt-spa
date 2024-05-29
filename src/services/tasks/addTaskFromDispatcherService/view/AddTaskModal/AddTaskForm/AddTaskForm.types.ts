import {
  EisTaskType,
  ErpSourceResponse,
  ErpTaskReasonGroupResponse,
  ResourceDisconnectingResponse,
} from 'api/types';
import dayjs from 'dayjs';
import { Event } from 'effector';
import {
  ExistingApartmentNumberType,
  HomeownerNameOption,
  PreparedAddress,
} from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.types';

export type AddTask = {
  sourceId: string | null;
  requestNumber?: string | null;
  taskType: null | EisTaskType;
  workTypeId: string | null;
  executorId: number | null;

  requestDate: dayjs.Dayjs | null;
  requestTime: dayjs.Dayjs | null;

  addressSearch: string;

  apartmentNumber: string | null;
  subscriberName?: string | null;
  phoneNumber?: string | null;

  taskDescription: string | null;

  taskReasonSearch: string | null;
  taskReasonOrderNumber: number | null;
  taskDeadlineDate?: dayjs.Dayjs | null;
  taskDeadlineTime?: dayjs.Dayjs | null;

  isSourceNumberRequired: boolean;
  isSubscriberRequired: boolean;
  isManualDeadlineRequired: boolean;

  city: string;
};

export type AddTaskFormProps = {
  formId: string;
  ERPSources: ErpSourceResponse[];
  preparedForOptionsAddresses: PreparedAddress[];
  handleCreateTask: (payload: AddTask) => void;
  setDisableSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectHousingAddress: (payload: string) => void;
  existingApartmentNumbers: ExistingApartmentNumberType[];
  resourceDisconnection: ResourceDisconnectingResponse[];
  handleSelectApartmentNumber: (payload: string) => void;
  apartmentHomeownerNames: HomeownerNameOption[];
  taskReasons: ErpTaskReasonGroupResponse[];
  handleSelectTaskReason: (payload: string) => void;
  handleSelectTaskType: (payload: EisTaskType) => void;
  isManualDeadlineRequired: boolean;
  selectedTaskReasonOption: ErpTaskReasonGroupResponse | null;
  handleChangeSubscriberName: (payload: string | null) => void;
  handleChangePhoneNumber: (payload: string | null) => void;
  isSavePhoneNumberOpen: boolean;
  handleReplacePhoneNumber: () => void;
  handleClosePhoneNumber: () => void;
  onSuccessSavePhone: Event<void>;
  existingCities: string[] | null;
  defaultCity: string | null;
  handleChangeCity: (payload: string) => void;
  handleSearchExecutor: () => void;
};

export type AddressOption = {
  value: string;
  key: string;
};
