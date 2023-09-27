import {
  EisTaskType,
  ErpExecutorResponse,
  ErpSourceResponse,
  ErpObjectResponse,
  ResourceDisconnectingResponse,
} from 'api/types';
import dayjs from 'dayjs';
import {
  ExistingApartmentNumberType,
  HomeownerNameOption,
} from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.types';

export type AddTask = {
  sourceId: string | null;
  requestNumber: string | null;
  taskType: null | EisTaskType;
  workTypeId: string | null;

  requestDate: dayjs.Dayjs | null;
  requestTime: string | null;

  manualDeadlineDate: dayjs.Dayjs | null;
  manualDeadlineTime: string | null;

  addressSearch: string;
  selectedObjectAddress: string | null;

  apartmentNumber: string | null;
  subscriberName: string | null;
  phoneNumber: string | null;

  leadId: string | null;
  executorId: string | null;

  taskDeadline: string | null;

  taskDescription: string | null;

  isPermittedToChangeDeadline: boolean;

  taskReasonSearch: string | null;
};

export type AddTaskFormProps = {
  formId: string;
  ERPSources: ErpSourceResponse[];
  leadExecutors: ErpExecutorResponse[];
  ErpObjects: ErpObjectResponse[];
  handleCreateTask: (payload: AddTask) => void;
  setDisableSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  choоseLeadExecutor: (payload: string) => void;
  executors: ErpExecutorResponse[];
  handleSelectHousingAddress: (payload: string) => void;
  existingApartmentNumbers: ExistingApartmentNumberType[];
  resourceDisconnection: ResourceDisconnectingResponse[];
  handleSelectApartmentNumber: (payload: string) => void;
  apartmentHomeownerNames: HomeownerNameOption[];
};
