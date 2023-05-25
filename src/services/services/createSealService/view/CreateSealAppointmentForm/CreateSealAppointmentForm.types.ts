import { ApartmentResponse } from 'myApi';

export type CreateSealAppointmentFormProps = {
  formId: string;
  handleCreateAppointment: () => void;
  apartment: ApartmentResponse;
};
