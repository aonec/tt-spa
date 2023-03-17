import { HouseManagementResponse } from 'myApi';
import { TreeSelectElement } from 'ui-kit/shared_components/AddressTreeSelect/AddressTreeSelect.types';
import {
  CreateSoiReportRequestPayload,
  SoiReportType,
} from '../../../soiReportService.types';

export type SoiReportFormProps = {
  soiReportType: SoiReportType;
  citiesList: string[] | null;
  setSelectedCity: (city: string) => void;
  selectedCity: string | null;
  houseManagements: HouseManagementResponse[] | null;
  preparedAddresses: TreeSelectElement[];
  createSoiReport: (payload: CreateSoiReportRequestPayload) => void;
};
