import { ESecuredIdentityRoleName, TaskListResponse } from 'myApi';

export type TasksListPanelProps = {
  filteredTasks: TaskListResponse[];
  selectedRole: ESecuredIdentityRoleName | null;
};
