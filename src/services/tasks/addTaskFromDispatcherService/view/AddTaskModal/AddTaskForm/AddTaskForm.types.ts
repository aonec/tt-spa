import {
  EisTaskType,
  ErpExecutorResponse,
  ErpSourceResponse,
  ResourceDisconnectingResponse,
} from 'api/types';
import dayjs from 'dayjs';
import {
  ErpTaskReasons,
  ExistingApartmentNumberType,
  HomeownerNameOption,
  PreparedAddress,
} from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.types';

export type AddTask = {
  sourceId: string | null;
  requestNumber: string | null;
  taskType: null | EisTaskType;
  workTypeId: string | null;

  requestDate: dayjs.Dayjs | null;
  requestTime: string | null;

  addressSearch: string;

  apartmentNumber: string | null;
  subscriberName: string | null;
  phoneNumber: string | null;

  leadId: string | null;
  executorId: string | null;

  taskDescription: string | null;

  taskReasonSearch: string | null;
};

export type AddTaskFormProps = {
  formId: string;
  ERPSources: ErpSourceResponse[];
  leadExecutors: ErpExecutorResponse[];
  preparedForOptionsAddresses: PreparedAddress[];
  handleCreateTask: (payload: AddTask) => void;
  setDisableSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  choоseLeadExecutor: (payload: string) => void;
  executors: ErpExecutorResponse[];
  handleSelectHousingAddress: (payload: string) => void;
  existingApartmentNumbers: ExistingApartmentNumberType[];
  resourceDisconnection: ResourceDisconnectingResponse[];
  handleSelectApartmentNumber: (payload: string) => void;
  apartmentHomeownerNames: HomeownerNameOption[];
  taskReasons: ErpTaskReasons[];
  handleSelectTaskReason: (payload: string) => void;
};

export type AddressOption = {
  value: string;
  key: string;
};
