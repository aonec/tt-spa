import { AppointmentResponse, DistrictResponse } from 'myApi';

export type Props = {
  districtsList: DistrictResponse[];
  isLoadingDistricts: boolean;
  handleSelectDistrict: (payload: string) => void;
  handleUnselectDistrict: () => void;
  selectedDistrict: string | null;
  handleSetAppointmentDate: (date: string) => void;
  appointmentDate: string;
  appointmentsInDistrict: AppointmentResponse[] | null;
  isLoadingAppointments: boolean;
};
