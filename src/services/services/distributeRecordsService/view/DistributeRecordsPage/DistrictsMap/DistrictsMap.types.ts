import {
  AppointmentAddress,
  AppointmentResponse,
  ControllerResponse,
  DistrictResponse,
} from 'myApi';
import { AppointmentsCountingByDistrictsResponse } from 'services/services/distributeRecordsService/distributeRecordsService.types';
import { AppointmentsIdWithController } from '../DistributeAppointmentsPanel/DistributeAppointmentsPanel.types';

export type Props = {
  districtsList: DistrictResponse[];
  handleSelectDistrict: (payload: string) => void;
  selectedDistrict: string | null;
  appointmentsInDistrict: AppointmentResponse[] | null;
  handleSelectHousingStock: (data: AppointmentsByHousingStocks) => void;
  selectedAppointmentsIds: AppointmentsIdWithController[];
  handleSelectAppointments: (ids: AppointmentsIdWithController[]) => void;
  isLoadingAppointments: boolean;
  handleUnselectDistrict: () => void;
  appointmentsCounting: AppointmentsCountingByDistrictsResponse | null;
  openDistributeAppointmentsModal: () => void;
  controllers: ControllerResponse[] | null;
};

export type AppointmentsByHousingStocks = {
  address: AppointmentAddress;
  appointments: AppointmentResponse[];
};
