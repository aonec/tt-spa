import {
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
  OrganizationResponsePagedList,
  YearRangeType,
} from 'api/types';
import { ExportReportType } from 'services/reportsService/reportViewService/reportViewService.types';
import { RunnerPayload } from '../createRunnerService.types';

export type Props = {
  existingCities: string[] | null;
  organizations: OrganizationResponsePagedList | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
  isOpen: boolean;
  setOpen: (payload: boolean) => void;
  isGenerating: boolean;
  handleGenerateReport: (payload: RunnerPayload) => void;
};

export type FormType = {
  exportType: ExportReportType | null;
  city: null | string;
  organizationId: null | number;
  houseManagementIds: null | string[];
  housingStockIds: number[] | null;
  yearRange: YearRangeType | null;
};
