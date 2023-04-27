import { ApartmentResponse } from 'myApi';

export enum PersonalNumberActionType {
  Add = 'Add',
  Edit = 'Edit',
  Switch = 'Switch',
  Split = 'Split',
}

export type SelectPersonalNumberActionContainerProps = {
  apartment: ApartmentResponse;
};
