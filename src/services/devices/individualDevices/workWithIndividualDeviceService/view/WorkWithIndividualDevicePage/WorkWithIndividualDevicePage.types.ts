import {
  ContractorListResponse,
  IndividualDeviceListResponseFromDevicePage,
  IndividualDeviceResponse,
} from 'api/types';
import { WorkWithIndividualDeviceType } from '../../workWithIndividualDeviceService.types';
import { EventCallable } from 'effector';
import { WorkWithIndividualDeviceFormType } from './WorkWithIndividualDeviceForm/WorkWithIndividualDeviceForm.types';

export type WorkWithIndividualDevicePageProps = {
  individualDevice: IndividualDeviceResponse | null;
  type: WorkWithIndividualDeviceType;
  contractors: ContractorListResponse[] | null;
  handleFetchSerialNumberForCheck: (serialNumber: string) => void;
  handleFetchModels: (model: string) => void;
  isSerialNumberLoading: boolean;
  serialNumberForChecking: IndividualDeviceListResponseFromDevicePage[];
  models: string[] | null;
  onSubmitCapture: EventCallable<void>;
  handleSubmitForm: (payload: WorkWithIndividualDeviceFormType) => void;
  deviceInfoForm: WorkWithIndividualDeviceFormType | null;
};
