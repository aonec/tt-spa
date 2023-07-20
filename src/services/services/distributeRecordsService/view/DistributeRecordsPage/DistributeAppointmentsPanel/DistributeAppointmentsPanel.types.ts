import { AppointmentResponse, ControllerResponse } from 'api/myApi';

export type DistributeAppointmentsPanelProps = {
  appointmentsInDistrict: AppointmentResponse[];
  selectedAppointmentsIds: string[];
  handleSelectAppointments: (ids: string[]) => void;
  isLoadingAppointments: boolean;
  handleUnselectDistrict: () => void;
  openDistributeAppointmentsModal: () => void;
  controllers: ControllerResponse[] | null;
  openRemoveAssignmentModal: (id: string) => void;
};

export type AppointmentsIdWithController = {
  id: React.Key;
  controllerId: string | null;
};
