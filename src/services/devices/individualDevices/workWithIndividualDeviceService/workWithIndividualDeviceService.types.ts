import {
  CheckIndividualDeviceRequest,
  EIndividualDeviceRateType,
  ESwitchingReason,
  SwitchIndividualDeviceReadingsCreateRequest,
  SwitchIndividualDeviceRequest,
} from 'api/types';
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

export type CheckIndividualDevicePayload = {
  deviceId: number;
  currentCheckingDate: string;
  futureCheckingDate: string;
  readingsAfterCheck: SwitchIndividualDeviceReadingsCreateRequest[] | null;
} & CheckIndividualDeviceRequest;

export type SwitchIndividualDevicePayload = {
  deviceId: number;
  rateType: EIndividualDeviceRateType;
  contractorId: string | null;
  sealInstallationDate: string | null;
  sealNumber: string | null;
  oldDeviceClosingReason: ESwitchingReason | undefined;
  isPolling: boolean;
  oldDeviceReadings: SwitchIndividualDeviceReadingsCreateRequest[] | null;
} & SwitchIndividualDeviceRequest;
