import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  OrganizationUserListResponse,
} from 'api/types';
import { FormikErrors } from 'formik';
import { GetTasksListRequestPayload } from 'services/tasks/tasksProfileService/tasksProfileService.types';

export type ToExecutionTasksExtendedSearchFormProps = {
  values: GetTasksListRequestPayload;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<GetTasksListRequestPayload>>;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  housingManagments?: GuidStringDictionaryItem[] | null;
  perpetrators?: OrganizationUserListResponse[] | null;
};
