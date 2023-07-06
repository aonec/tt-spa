import {
  EisTaskType,
  ExecutorGrpcModel,
  GetTaskDeadlineGrpcResponse,
  SourceGrpcModel,
  WorkCategoryGrpcModel,
} from 'myApi';
import { GetTaskDeadlineRequest } from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.types';

export type AddTask = {
  sourceId: string | null;
  requestNumber: string | null;
  taskType: null | EisTaskType;
  // categoryId: string | null;
  workTypeId: string | null;

  requestDate: moment.Moment | null;
  requestTime: string | null;

  manualDeadlineDate: moment.Moment | null;
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
};

export type AddTaskFormProps = {
  formId: string;
  ERPSources: SourceGrpcModel[];
  leadExecutors: ExecutorGrpcModel[];
  workCategories: WorkCategoryGrpcModel[];
  ErpObjects: {
    id?: string | null;
    address?: string | null;
  }[];
  handleCreateTask: (payload: AddTask) => void;
  setDisableSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  choоseLeadExecutor: (payload: string) => void;
  executors: ExecutorGrpcModel[];
  handleTaskDeadlineRequest: (payload: GetTaskDeadlineRequest) => void;
  taskDeadline: GetTaskDeadlineGrpcResponse | null;
};