import { ApartmentResponse } from 'api/myApi';

export enum PersonalNumberActions {
  Add = 'add',
  Edit = 'edit',
  Switch = 'switch',
  Split = 'split',
}

export type SelectPersonalNumberActionContainerProps = {
  apartment: ApartmentResponse;
};
