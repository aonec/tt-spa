import {
  ExecutorGrpcModel,
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
};
