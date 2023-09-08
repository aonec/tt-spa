import {
  ApartmentResponse,
  IndividualDeviceListItemResponse,
  AppointmentResponse,
} from 'api/types';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
} from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';
import { OpenCreateSealModalPayload } from 'services/services/createSealService/createSealService.types';

export type ApartmentSealProfileProps = {
  apartment: ApartmentResponse | null;
  isLoadingApartment: boolean;
  searchApartment: (payload: GetApartmentsRequestPayload) => void;
  setSelectedHomeownerName: (name: string | null) => void;
  selectedHomeownerName: string | null;
  updateApartment: (payload: UpdateApartmentRequestPayload) => void;
  individualDevices: IndividualDeviceListItemResponse[];
  openCreateSealAppointmentModal: (payload: OpenCreateSealModalPayload) => void;
  nearestAppointment: AppointmentResponse | null;
  isAppointmentLoading: boolean;
  isApartmentFetched: boolean;
  openRemoveAppointmentModal: () => void;
};
