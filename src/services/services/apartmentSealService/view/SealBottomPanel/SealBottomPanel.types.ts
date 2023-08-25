import { ApartmentResponse } from 'api/types';

export type SealBottomPanelProps = {
  apartment: ApartmentResponse;
  openCreateSealAppointmentModal: () => void;
  isAppointmentExist: boolean;
};
