import {
  ApartmentResponse,
  AppointmentCreateRequest,
  AppointmentResponse,
} from 'api/types';

export type OpenCreateSealModalPayload = {
  apartment: ApartmentResponse;
  appointment: AppointmentResponse | null;
};

export type WorkWithAppoitnmentPayload = Omit<
  AppointmentCreateRequest,
  'apartmentId'
>;

export enum WorkWithAppointmentType {
  create = 'create',
  edit = 'edit',
}
