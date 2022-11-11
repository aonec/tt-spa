import { HouseManagementResponse } from 'myApi';
import { TreeSelectElement } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionModal/CreateResourceDisconnectionModal.types';
import { SoiReportType } from '../../soiReportService.model.types';

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
};
