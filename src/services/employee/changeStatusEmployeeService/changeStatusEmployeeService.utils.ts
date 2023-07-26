import moment from 'moment';
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
    startDate: moment(data?.startDate)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toISOString(true),
    endDate: moment(data?.endDate)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toISOString(true),
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
