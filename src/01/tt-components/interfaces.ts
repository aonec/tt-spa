import { TaskListResponse } from '../../myApi';
import { Dispatch, SetStateAction } from 'react';

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
  description?: string;
}

export interface TabErrorsInterface {
  key: string;
  value: Array<string>;
}

export interface AlertInterface {
  name: string;
  styles?: any;
  errors?: object;
  touched?: object;
}

export interface ModalInterface {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}
