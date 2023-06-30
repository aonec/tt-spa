import { workWithIndividualDeviceService } from './workWithIndividualDeviceService.model';

export type WorkWithIndividualDeviceContainerProps = {
  type: WorkWithIndividualDeviceType;
};

export enum WorkWithIndividualDeviceType {
  reopen = 'reopen',
  check = 'check',
  switch = 'switch',
}

export type WorkWithIndividualDeviceFormType =
  typeof workWithIndividualDeviceService.forms.deviceInfoForm;
