import {
  ContractorListResponse,
  EClosingReason,
  EIndividualDeviceRateType,
  EResourceType,
  ESwitchingReason,
  IndividualDeviceListResponseFromDevicePage,
  IndividualDeviceResponse,
} from 'api/types';
import {
  PreparedForFormReadings,
  WorkWithIndividualDeviceType,
} from '../../../workWithIndividualDeviceService.types';
import { EventCallable } from 'effector';

export type WorkWithIndividualDeviceFormProps = {
  type: WorkWithIndividualDeviceType;
  contractors: ContractorListResponse[] | null;
  handleFetchSerialNumberForCheck: (serialNumber: string) => void;
  handleFetchModels: (model: string) => void;
  isSerialNumberLoading: boolean;
  models: string[] | null;
  individualDevice: IndividualDeviceResponse;
  serialNumberForChecking: IndividualDeviceListResponseFromDevicePage[];
  onSubmitCapture: EventCallable<void>;
  handleSubmitForm: (payload: WorkWithIndividualDeviceFormType) => void;
};

export type WorkWithIndividualDeviceFormType = {
  model: string | null;
  serialNumber: string | null;
  bitDepth: number | null;
  scaleFactor: number | null;
  rateType: EIndividualDeviceRateType;
  sealNumber: string | null;
  sealInstallationDate: string | null;
  lastCheckingDate: string | null;
  futureCheckingDate: string | null;
  contractorId: number | null;
  oldDeviceClosingReason: EClosingReason | ESwitchingReason | null;
  lastCommercialAccountingDate: string | null;
  documentsIds: number[];
  isPolling: boolean;
  mountPlaceId: number | null;
  oldDeviceReadings: {
    [key: number]: PreparedForFormReadings;
  };
  newDeviceReadings: {
    [key: number]: PreparedForFormReadings;
  };
  resource: EResourceType | null;
};
