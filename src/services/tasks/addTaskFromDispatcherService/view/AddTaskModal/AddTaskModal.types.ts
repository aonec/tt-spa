import {
  ExecutorGrpcModel,
  SourceGrpcModel,
  WorkCategoryGrpcModel,
} from 'myApi';

export type AddTaskModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  ERPSources: SourceGrpcModel[];
  ErpObjects: ExecutorGrpcModel[];
  leadExecutors: ExecutorGrpcModel[];
  workCategories: WorkCategoryGrpcModel[];
};
