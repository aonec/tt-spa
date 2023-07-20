import { ApartmentResponse, AppointmentCreateRequest } from 'api/myApi';

export type CreateSealAppointmentFormProps = {
  formId: string;
  handleCreateAppointment: (
    payload: Omit<AppointmentCreateRequest, 'apartmentId'>,
  ) => void;
  apartment: ApartmentResponse;
};

export type AppointmentCreateFormik = {
  date?: string;
  homeownerFullName?: string;
  homeownerPhone?: string;
  sealCountPlan?: number;
  comment?: string;
};
