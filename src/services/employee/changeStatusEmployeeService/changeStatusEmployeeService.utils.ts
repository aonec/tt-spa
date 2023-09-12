import dayjs from 'api/dayjs';
import {
  AddOrganizationUserWorkingStatusRequest,
  EOrganizationUserWorkingStatusType,
} from 'api/types';
import { UserTasksByRoles } from './changeStatusEmployeeService.types';

export const getTasksCount = (tasksByRoles: UserTasksByRoles) => {
  return tasksByRoles.reduce((acc, { tasks }) => acc + tasks.length, 0);
};

export const prepareUpdateStatusPayload = (
  data: AddOrganizationUserWorkingStatusRequest | null,
) => {
  return {
    ...data,
    startDate: dayjs(data?.startDate)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .format(),
    endDate: dayjs(data?.endDate)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .format(),
  };
};

export const isNeedTransferTasks = (
  type: EOrganizationUserWorkingStatusType,
) => {
  return (
    type === EOrganizationUserWorkingStatusType.OnVacation ||
    type === EOrganizationUserWorkingStatusType.Sick
  );
};
