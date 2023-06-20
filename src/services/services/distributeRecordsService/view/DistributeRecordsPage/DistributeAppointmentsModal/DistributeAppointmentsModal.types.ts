import { ControllerResponse } from 'myApi';

export type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  appointmentDate: string | null;
  controllers: ControllerResponse[] | null;
};
