import {
  EisTaskType,
  ErpExecutorResponse,
  ErpTaskDeadlineResponse,
  ErpSourceResponse,
  ErpWorkCategoryResponse,
  ErpObjectResponse,
} from 'api/types';
import dayjs from 'dayjs';
import { GetTaskDeadlineRequest } from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.types';

export type AddTask = {
  sourceId: string | null;
  requestNumber: string | null;
  taskType: null | EisTaskType;
  // categoryId: string | null;
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

  petitionId: string | null;
};

export type AddTaskFormProps = {
  formId: string;
  ERPSources: ErpSourceResponse[];
  leadExecutors: ErpExecutorResponse[];
  workCategories: ErpWorkCategoryResponse[];
  ErpObjects: ErpObjectResponse[];
  handleCreateTask: (payload: AddTask) => void;
  setDisableSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  choоseLeadExecutor: (payload: string) => void;
  executors: ErpExecutorResponse[];
  handleTaskDeadlineRequest: (payload: GetTaskDeadlineRequest) => void;
  taskDeadline: ErpTaskDeadlineResponse | null;
};
