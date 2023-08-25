import { ESecuredIdentityRoleName, TaskListResponse } from 'api/types';

export type TasksListPanelProps = {
  filteredTasks: TaskListResponse[];
  selectedRole: ESecuredIdentityRoleName | null;
};
