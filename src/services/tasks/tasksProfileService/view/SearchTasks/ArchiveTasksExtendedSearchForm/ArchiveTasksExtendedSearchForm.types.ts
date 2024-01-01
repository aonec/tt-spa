import { EManagingFirmTaskFilterTypeNullableStringDictionaryItem } from 'api/types';
import { GetTasksListRequestPayload } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { FormikErrors } from 'formik';

export type ArchiveTasksExtendedSearchFormProps = {
  values: GetTasksListRequestPayload;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<GetTasksListRequestPayload>>;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
};
