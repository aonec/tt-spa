import dayjs from 'api/dayjs';
import {
  AddOrganizationUserWorkingStatusRequest,
  EOrganizationUserWorkingStatusType,
} from 'api/types';
import { UserTasksByRoles } from './changeStatusEmployeeService.types';

export const getTasksCount = (tasksByRoles: UserTasksByRoles) => {
  return tasksByRoles.reduce(
    (acc, tasksByRole) =>
      acc +
      Number(tasksByRole.tasks?.activeTasksCount) +
      Number(tasksByRole.tasks?.executingTasksCount) +
      Number(tasksByRole.tasks?.expiredTasksCount) +
      Number(tasksByRole.tasks?.observingTasksCount) +
      Number(tasksByRole.tasks?.runningOutTasksCount),
    0,
  );
};

export const prepareUpdateStatusPayload = (
  data: AddOrganizationUserWorkingStatusRequest | null,
) => {
  return {
    ...data,
    startDate: data?.startDate
      ? dayjs(data?.startDate)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0)
          .format()
      : null,
    endDate: data?.endDate
      ? dayjs(data?.endDate)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0)
          .format()
      : null,
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
