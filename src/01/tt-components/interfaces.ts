import { TaskListResponse } from '../../myApi';

export interface MenuButtonInterface {
  title: string;
  show: () => void;
  cb: () => void;
}
export interface EventsInterface {
  title: string;
  tasks: TaskListResponse[];
}
