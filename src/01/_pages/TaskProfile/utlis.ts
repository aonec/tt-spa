import { TaskResponse } from 'myApi';

export const getNodeIdFromTask = (task: TaskResponse) => {
  if (task.pipeNode?.id) return task.pipeNode?.id;

  const isNodeTask =
    task.type === 'HousingDeviceMalfunction' ||
    task.type === 'HousingDeviceMalfunctionNonCommercial';

  if (isNodeTask && task.device?.nodeId) return task.device.nodeId;

  return null;
};
