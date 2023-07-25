import {
  ContractorListResponse,
  IndividualDeviceListResponseFromDevicePage,
  IndividualDeviceResponse,
} from 'api/types';
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
  serialNumberForChecking: IndividualDeviceListResponseFromDevicePage[];
  models: string[] | null;
};
