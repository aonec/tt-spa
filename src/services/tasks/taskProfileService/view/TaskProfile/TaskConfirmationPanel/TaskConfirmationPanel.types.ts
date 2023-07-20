import { EManagingFirmTaskType, TaskConfirmationResponse } from 'api/myApi';

export type TaskConfirmationPanelProps = {
  taskConfirmation: TaskConfirmationResponse;
  taskType: EManagingFirmTaskType;
};
