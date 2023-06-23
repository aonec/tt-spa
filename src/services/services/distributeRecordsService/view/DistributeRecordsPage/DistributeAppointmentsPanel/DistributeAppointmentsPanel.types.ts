import { AppointmentResponse, ControllerResponse } from 'myApi';

export type DistributeAppointmentsPanelProps = {
  appointmentsInDistrict: AppointmentResponse[];
  selectedAppointmentsIds: string[];
  handleSelectAppointments: (ids: string[]) => void;
  isLoadingAppointments: boolean;
  handleUnselectDistrict: () => void;
  openDistributeAppointmentsModal: () => void;
  controllers: ControllerResponse[] | null;
};

export type AppointmentsIdWithController = {
  id: React.Key;
  controllerId: string | null;
};
