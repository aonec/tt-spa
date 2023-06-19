import { ApartmentResponse, IndividualDeviceListItemResponse } from 'myApi';
import { AppointmentResponse } from 'myApi-test';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
} from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';

export type ApartmentSealProfileProps = {
  apartment: ApartmentResponse | null;
  isLoadingApartment: boolean;
  searchApartment: (payload: GetApartmentsRequestPayload) => void;
  setSelectedHomeownerName: (name: string) => void;
  selectedHomeownerName: string | null;
  updateApartment: (payload: UpdateApartmentRequestPayload) => void;
  individualDevices: IndividualDeviceListItemResponse[];
  openCreateSealAppointmentModal: (apartment: ApartmentResponse) => void;
  nearestAppointment: AppointmentResponse | null;
};
