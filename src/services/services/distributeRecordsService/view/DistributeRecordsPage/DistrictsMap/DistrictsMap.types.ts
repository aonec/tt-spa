import {
  AppointmentAddress,
  AppointmentResponse,
  DistrictResponse,
} from 'myApi';
import { AppointmentsCountingByDistrictsResponse } from 'services/services/distributeRecordsService/distributeRecordsService.types';

export type Props = {
  districtsList: DistrictResponse[];
  handleSelectDistrict: (payload: string) => void;
  selectedDistrict: string | null;
  appointmentsInDistrict: AppointmentResponse[] | null;
  handleSelectHousingStock?: (data: AppointmentsByHousingStocks) => void;
  selectedAppointmentsIds: string[];
  handleSelectAppointments: (ids: string[]) => void;
  isLoadingAppointments: boolean;
  handleUnselectDistrict: () => void;
  appointmentsCounting: AppointmentsCountingByDistrictsResponse | null;
};

export type AppointmentsByHousingStocks = {
  address: AppointmentAddress;
  appointments: AppointmentResponse[];
};
