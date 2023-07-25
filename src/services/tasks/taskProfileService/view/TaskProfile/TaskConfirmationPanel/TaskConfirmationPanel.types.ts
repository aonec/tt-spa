import { EManagingFirmTaskType, TaskConfirmationResponse } from 'api/types';

export type TaskConfirmationPanelProps = {
  taskConfirmation: TaskConfirmationResponse;
  taskType: EManagingFirmTaskType;
};
