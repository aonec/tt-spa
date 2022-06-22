import { createDevice, createTimeline, createTimer } from '01/_api/utils';
import { TaskListResponse } from 'myApi';

export const preparedData = (
  tasks: TaskListResponse[] | null | undefined,
  grouptype: string
) =>
  tasks &&
  tasks.map((item) => ({
    ...item,
    timeline: createTimeline(item),
    timer: createTimer(item),
    device: createDevice(item.device),
    calendar: new Date(item.creationTime!).toLocaleString(),
    showExecutor: grouptype === 'observing',
  }));
