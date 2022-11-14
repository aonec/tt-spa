import { HouseManagementResponse } from 'myApi';
import { TreeSelectElement } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionModal/CreateResourceDisconnectionModal.types';
import { CreateSoiReportRequestPayload, SoiReportType } from '../../../soiReportService.model.types';

export type SoiReportFormProps = {
  soiReportType: SoiReportType;
  citiesList: string[] | null;
  setSelectedCity: (city: string) => void;
  selectedCity: string | null;
  houseManagements: HouseManagementResponse[] | null;
  preparedAddresses: TreeSelectElement[];
  createSoiReport: (payload: CreateSoiReportRequestPayload) => void;
};
