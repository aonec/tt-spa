import dayjs from 'dayjs';
import { EResourceType, HouseManagementResponse } from 'api/types';
import { TreeSelectElement } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.types';
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

export type CreateSoiReportForm = {
  ReportName: string;
  HouseManagementId: string | null;
  HousingStockIdHash: string | null;
  Resource: EResourceType | null;
  Period: 'month' | 'year';
  NormativePerPerson: string;
  Date: dayjs.Dayjs | null;
};
