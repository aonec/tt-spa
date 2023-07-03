import {
  ExecutorGrpcModel,
  GetTaskDeadlineGrpcResponse,
  GetTaskDeadlineRequest,
  SourceGrpcModel,
  WorkCategoryGrpcModel,
} from 'myApi';
import { AddTask } from './AddTaskForm/AddTaskForm.types';

export type AddTaskModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  ERPSources: SourceGrpcModel[];
  ErpObjects: ExecutorGrpcModel[];
  leadExecutors: ExecutorGrpcModel[];
  workCategories: WorkCategoryGrpcModel[];
  handleCreateTask: (payload: AddTask) => void;
  choоseLeadExecutor: (payload: string) => void;
  executors: ExecutorGrpcModel[];
  handleTaskDeadlineRequest: (payload: GetTaskDeadlineRequest) => void;
  taskDeadline: GetTaskDeadlineGrpcResponse | null;
};
