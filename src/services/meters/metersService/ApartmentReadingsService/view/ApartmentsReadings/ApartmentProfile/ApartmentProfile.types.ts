import { ApartmentResponse, AppointmentResponse } from 'api/types';
import {
  EditPhoneNumberRequest,
  GetApartmentsRequestPayload,
  RemovePhoneNumberRequest,
  UpdateApartmentRequestPayload,
  UpdateHomeownerRequestPayload,
} from '../../../ApartmentReadingsService.types';

export type ApartmentProfileProps = {
  handleSearchApartment: (payload: GetApartmentsRequestPayload) => void;
  isLoadingApartment: boolean;
  apartment: ApartmentResponse | null;
  handleUpdateApartment: (payload: UpdateApartmentRequestPayload) => void;
  handlePauseApartment: () => void;
  handleCancelPauseApartment: () => void;
  openEditPersonalNumberModal: (payload: boolean) => boolean;
  setSelectedHomeownerName: (payload: string | null) => void;
  selectedHomeownerName: string | null;
  isPermitionToApartmentStatusPatch: boolean;
  printIssueCertificate: () => void;
  handleUpdateHomeowner: (payload: UpdateHomeownerRequestPayload) => void;
  isUpdateHomeownerLoading: boolean;
  isApartmentFetched: boolean;
  nearestAppointment: AppointmentResponse | null;
  addPhoneNumber: (payload: EditPhoneNumberRequest) => void;
  deletePhoneNumber: (payload: RemovePhoneNumberRequest) => void;
};
