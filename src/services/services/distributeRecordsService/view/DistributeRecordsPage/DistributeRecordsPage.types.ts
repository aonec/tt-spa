import {
  AppointmentResponse,
  AppointmentsSetRequest,
  ControllerResponse,
  DistrictResponse,
} from 'api/types';
import { AppointmentsByHousingStocks } from './DistrictsMap/DistrictsMap.types';
import { AppointmentsCountingByDistrictsResponse } from '../../distributeRecordsService.types';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';

export type Props = {
  districtsList: DistrictResponse[];
  isLoadingDistricts: boolean;
  handleSelectDistrict: (payload: string) => void;
  handleUnselectDistrict: () => void;
  selectedDistrict: string | null;
  handleSetAppointmentDate: (date: string) => void;
  appointmentDate: string | null;
  appointmentsInDistrict: AppointmentResponse[] | null;
  isLoadingAppointments: boolean;
  handleSelectHousingStock: (data: AppointmentsByHousingStocks) => void;
  selectedAppointmentsIds: string[];
  handleSelectAppointments: (ids: string[]) => void;
  appointmentsCounting: AppointmentsCountingByDistrictsResponse | null;
  openDistributeAppointmentsModal: () => void;
  closeDistributeAppointmentsModal: () => void;
  isDistributeAppointmentsModalOpen: boolean;
  controllers: ControllerResponse[] | null;
  openCreateControllerModal: () => void;
  setAppointmentsToController: (payload: AppointmentsSetRequest) => void;
  isLoadingDistributeAppointments: boolean;
  openRemoveAssignmentModal: (id: string) => void;
  organizationCoordinates: OrganizationCoordinates | null;
  appointmentsExistingDays: { [key: string]: boolean };
  handleSetMonth: (month: string) => void;
};
