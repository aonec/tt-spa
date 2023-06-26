import { AppointmentsSetRequest, ControllerResponse } from 'myApi';

export type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  appointmentDate: string | null;
  controllers: ControllerResponse[] | null;
  openCreateControllerModal: () => void;
  setAppointmentsToController: (payload: AppointmentsSetRequest) => void;
  selectedAppointmentsIds: string[];
  isLoadingDistributeAppointments: boolean;
};
