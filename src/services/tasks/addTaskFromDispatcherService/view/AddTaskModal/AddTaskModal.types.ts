import {
  ErpExecutorResponse,
  ErpTaskDeadlineResponse,
  ErpSourceResponse,
  ErpWorkCategoryResponse,
  ErpObjectResponse,
} from 'api/myApi';
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
  taskDeadline: ErpTaskDeadlineResponse | null;
  isCreatePending: boolean;
};
