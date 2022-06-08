export enum TaskType {
  CheckIndividualDevices = 'CheckIndividualDevices',
}

export type ExportTasksListRequestPayload = {
  type: TaskType;
};
