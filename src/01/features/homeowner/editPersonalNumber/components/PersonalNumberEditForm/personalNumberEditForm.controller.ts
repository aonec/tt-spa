import { createGate } from 'effector-react';

export enum PersonalNumberFormMountPlaceType {
  Add = 'Add',
  Edit = 'Edit',
  Switch = 'Switch',
  Split = 'Split',
}

export const PersonalNumberFormTypeGate = createGate<{
  type: PersonalNumberFormMountPlaceType;
}>();
