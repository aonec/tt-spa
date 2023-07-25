import {
  ContractorListResponse,
  IndividualDeviceListResponseFromDevicePage,
  IndividualDeviceResponse,
} from 'api/types';
import {
  WorkWithIndividualDeviceFormType,
  WorkWithIndividualDeviceType,
} from '../../../workWithIndividualDeviceService.types';

export type WorkWithIndividualDeviceFormProps = {
  type: WorkWithIndividualDeviceType;
  form: WorkWithIndividualDeviceFormType;
  contractors: ContractorListResponse[] | null;
  handleFetchSerialNumberForCheck: (serialNumber: string) => void;
  handleFetchModels: (model: string) => void;
  isSerialNumberLoading: boolean;
  models: string[] | null;
  individualDevice: IndividualDeviceResponse;
  serialNumberForChecking: IndividualDeviceListResponseFromDevicePage[];
};
