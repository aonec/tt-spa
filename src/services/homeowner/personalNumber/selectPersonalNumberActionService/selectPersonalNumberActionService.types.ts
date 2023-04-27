import { ApartmentResponse } from 'myApi';

export enum PersonalNumberActions {
  Add = 'Add',
  Edit = 'Edit',
  Switch = 'Switch',
  Split = 'Split',
}

export type SelectPersonalNumberActionContainerProps = {
  apartment: ApartmentResponse;
};
