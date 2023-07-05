import {
  ErpExecutorResponse,
  GetTaskDeadlineGrpcResponse,
  ErpSourceResponse,
  ErpWorkCategoryResponse,
  ErpObjectResponse,
} from 'myApi';
import { AddTask } from './AddTaskForm/AddTaskForm.types';
import { GetTaskDeadlineRequest } from '../../addTaskFromDispatcherService.types';

export type AddTaskModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  ERPSources: ErpSourceResponse[];
  ErpObjects: ErpObjectResponse[];
  leadExecutors: ErpExecutorResponse[];
  workCategories: ErpWorkCategoryResponse[];
  handleCreateTask: (payload: AddTask) => void;
  choоseLeadExecutor: (payload: string) => void;
  executors: ErpExecutorResponse[];
  handleTaskDeadlineRequest: (payload: GetTaskDeadlineRequest) => void;
  taskDeadline: GetTaskDeadlineGrpcResponse | null;
  isCreatePending: boolean;
};
