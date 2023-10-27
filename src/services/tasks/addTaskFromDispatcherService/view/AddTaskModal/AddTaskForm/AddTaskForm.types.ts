import {
  EisTaskType,
  ErpSourceResponse,
  ErpTaskReasonGroupResponse,
  ErpTaskReasonItemResponse,
  ResourceDisconnectingResponse,
} from 'api/types';
import dayjs from 'dayjs';
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
  handleSelectTaskReason: (payload: number) => void;
  handleSelectTaskType: (payload: EisTaskType) => void;
  isManualDeadlineRequired: boolean;
  selectedTaskReasonOption: ErpTaskReasonItemResponse[];
};

export type AddressOption = {
  value: string;
  key: string;
};
