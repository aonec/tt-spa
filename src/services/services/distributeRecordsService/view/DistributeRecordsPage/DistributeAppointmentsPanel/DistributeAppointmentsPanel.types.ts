import { AppointmentResponse, ControllerResponse } from 'myApi';

export type DistributeAppointmentsPanelProps = {
  appointmentsInDistrict: AppointmentResponse[];
  selectedAppointmentsIds: AppointmentsIdWithController[];
  handleSelectAppointments: (ids: AppointmentsIdWithController[]) => void;
  isLoadingAppointments: boolean;
  handleUnselectDistrict: () => void;
  openDistributeAppointmentsModal: () => void;
  controllers: ControllerResponse[] | null;
};

export type AppointmentsIdWithController = {
  id: React.Key;
  controllerId: string | null;
};
