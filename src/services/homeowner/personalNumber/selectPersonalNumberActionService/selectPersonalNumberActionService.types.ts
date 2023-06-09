import { ApartmentResponse } from 'myApi';

export enum PersonalNumberActions {
  Add = 'add',
  Edit = 'edit',
  Switch = 'switch',
  Split = 'split',
}

export type SelectPersonalNumberActionContainerProps = {
  apartment: ApartmentResponse;
};
