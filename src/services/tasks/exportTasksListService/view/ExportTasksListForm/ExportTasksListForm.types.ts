import { ExportTasksListRequestPayload } from '../../exportTasksListService.types';

export type ExportTasksListFormProps = {
  formId: string;
  handleSubmit: (type: ExportTasksListRequestPayload) => void;
};
