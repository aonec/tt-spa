import { IndividualDeviceOnTaskResponse } from 'myApi';
import {
  Timeline,
  Timer,
} from 'services/tasks/tasksProfileService/view/TasksListItem/TasksListItem.types';

export type TaskProfileHeaderProps = {
  name: string;
  devices: IndividualDeviceOnTaskResponse[];
  timeline: Timeline | null;
  timer: Timer;
  taskName: string;
};
