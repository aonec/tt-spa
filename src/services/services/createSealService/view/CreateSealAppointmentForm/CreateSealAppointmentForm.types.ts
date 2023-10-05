import {
  ApartmentResponse,
  AppointmentCreateRequest,
  AppointmentResponse,
} from 'api/types';

export type CreateSealAppointmentFormProps = {
  formId: string;
  handleWorkWithAppointment: (
    payload: Omit<AppointmentCreateRequest, 'apartmentId'>,
  ) => void;
  apartment: ApartmentResponse;
  appointment: AppointmentResponse | null;
  setMonth: (month: string) => void;
  appointmentsOnMonthData: { [key: string]: number };
  appointmentsOnMonthLoading: boolean;
  districtId: string | null;
};

export type AppointmentCreateFormik = {
  date?: string;
  homeownerFullName?: string;
  homeownerPhone?: string;
  sealCountPlan?: number;
  comment?: string;
};
