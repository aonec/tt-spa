import { ContractorListResponse, IndividualDeviceResponse } from 'myApi';
import {
  WorkWithIndividualDeviceFormType,
  WorkWithIndividualDeviceType,
} from '../../workWithIndividualDeviceService.types';

export type WorkWithIndividualDevicePageProps = {
  individualDevice: IndividualDeviceResponse | null;
  type: WorkWithIndividualDeviceType;
  form: WorkWithIndividualDeviceFormType;
  contractors: ContractorListResponse[] | null;
  handleFetchSerialNumberForCheck: (serialNumber: string) => void;
  handleFetchModels: (model: string) => void;
  isSerialNumberLoading: boolean;
  isSerialNumberAllreadyExist: boolean;
  models: string[] | null;
};
