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

export interface TabsItemInterface {
  title: string;
  key: string;
  cb: any;
}

export interface TabErrorsInterface {
  key: string;
  value: Array<string>;
}

export interface AlertInterface {
  name: string;
}
