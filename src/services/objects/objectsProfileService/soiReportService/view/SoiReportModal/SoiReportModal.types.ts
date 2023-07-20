import { HouseManagementResponse } from 'api/types';
import { TreeSelectElement } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.types';
import {
  CreateSoiReportRequestPayload,
  SoiReportType,
} from '../../soiReportService.types';

export type SoiReportModalProps = {
  isModalOpen: boolean;
  closeSoiReportModal: () => void;
  soiReportType: SoiReportType | null;
  setSoiReportType: (payload: SoiReportType) => SoiReportType;
  citiesList: string[] | null;
  setSelectedCity: (city: string) => void;
  selectedCity: string | null;
  houseManagements: HouseManagementResponse[] | null;
  preparedAddresses: TreeSelectElement[];
  createSoiReport: (payload: CreateSoiReportRequestPayload) => void;
  isCreateReportLoading: boolean;
};
