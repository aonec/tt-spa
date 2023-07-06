import {
  ExecutorGrpcModel,
  SourceGrpcModel,
  WorkCategoryGrpcModel,
} from 'myApi';

export type AddTaskFormProps = {
  formId: string;
  ERPSources: SourceGrpcModel[];
  leadExecutors: ExecutorGrpcModel[];
  workCategories: WorkCategoryGrpcModel[];
  ErpObjects: {
    id?: string | null;
    address?: string | null;
  }[];
};
