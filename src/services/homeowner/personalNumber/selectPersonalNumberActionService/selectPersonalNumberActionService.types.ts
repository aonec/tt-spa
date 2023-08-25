import { ApartmentResponse } from 'api/types';

export enum PersonalNumberActions {
  Add = 'add',
  Edit = 'edit',
  Switch = 'switch',
  Split = 'split',
}

export type SelectPersonalNumberActionContainerProps = {
  apartment: ApartmentResponse;
};
