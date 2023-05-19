import { UserTasksByRoles } from './changeStatusEmployeeService.types';

export const getTasksCount = (tasksByRoles: UserTasksByRoles) => {
  return tasksByRoles.reduce((acc, { tasks }) => acc + tasks.length, 0);
};
