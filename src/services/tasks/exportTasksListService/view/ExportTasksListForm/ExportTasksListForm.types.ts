import {
  ExportTasksListRequestPayload, ExportTaskType,
} from '../../exportTasksListService.types';

export type ExportTasksListFormProps = {
  formId: string;
  handleSubmit: (type: ExportTasksListRequestPayload) => void;
  taskFilters: ExportTaskType[];
};
