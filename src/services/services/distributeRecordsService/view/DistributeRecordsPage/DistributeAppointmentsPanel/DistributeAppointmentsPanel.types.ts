import { AppointmentResponse } from 'myApi';

export type DistributeAppointmentsPanelProps = {
  appointmentsInDistrict: AppointmentResponse[];
  selectedAppointmentsIds: string[];
  handleSelectAppointments: (ids: string[]) => void;
  isLoadingAppointments: boolean;
  handleUnselectDistrict: () => void;
  openDistributeAppointmentsModal: () => void;
};
