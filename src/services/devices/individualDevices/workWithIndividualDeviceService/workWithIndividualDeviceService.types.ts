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

export type PreparedForFormReadings = {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  readingDate: string | null;
};
