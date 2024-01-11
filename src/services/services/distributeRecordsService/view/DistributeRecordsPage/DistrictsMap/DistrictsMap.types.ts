import {
  AppointmentAddress,
  AppointmentResponse,
  ControllerResponse,
  DistrictResponse,
} from 'api/types';
import { OrganizationCoordinates } from 'services/currentOrganizationService/currentOrganizationService.types';
import { AppointmentsCountingByDistrictsResponse } from 'services/services/distributeRecordsService/distributeRecordsService.types';

export type Props = {
  districtsList: DistrictResponse[];
  handleSelectDistrict: (payload: string) => void;
  selectedDistrict: string | null;
  appointmentsInDistrict: AppointmentResponse[] | null;
  handleSelectHousingStock: (data: AppointmentsByHousingStocks) => void;
  selectedAppointmentsIds: string[];
  handleSelectAppointments: (ids: string[]) => void;
  isLoadingAppointments: boolean;
  handleUnselectDistrict: () => void;
  appointmentsCounting: AppointmentsCountingByDistrictsResponse | null;
  openDistributeAppointmentsModal: () => void;
  controllers: ControllerResponse[] | null;
  openRemoveAssignmentModal: (id: string) => void;
  organizationCoordinates: OrganizationCoordinates | null;
};

export type AppointmentsByHousingStocks = {
  address: AppointmentAddress;
  appointments: AppointmentResponse[];
};
