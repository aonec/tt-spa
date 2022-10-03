import { EManagingFirmTaskType, TaskConfirmationResponse } from 'myApi';

export type TaskConfirmationPanelProps = {
  taskConfirmation: TaskConfirmationResponse;
  taskType: EManagingFirmTaskType;
};
