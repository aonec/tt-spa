import { ESecuredIdentityRoleName, TaskListResponse } from 'api/myApi';

export type TasksListPanelProps = {
  filteredTasks: TaskListResponse[];
  selectedRole: ESecuredIdentityRoleName | null;
};
