import { AppointmentResponse, DistrictResponse } from 'myApi';
import { AppointmentsByHousingStocks } from './DistrictsMap/DistrictsMap.types';
import { AppointmentsCountingByDistrictsResponse } from '../../distributeRecordsService.types';

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
};
