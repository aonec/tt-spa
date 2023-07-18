import { ApartmentResponse, HomeownerAccountUpdateRequest } from 'myApi';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
} from '../../../ApartmentReadingsService.types';

export type ApartmentProfileProps = {
  handleSearchApartment: (payload: GetApartmentsRequestPayload) => void;
  isLoadingApartment: boolean;
  apartment: ApartmentResponse | null;
  handleUpdateApartment: (payload: UpdateApartmentRequestPayload) => void;
  handlePauseApartment: () => void;
  handleCancelPauseApartment: () => void;
  openEditPersonalNumberModal: (payload: boolean) => boolean;
  setSelectedHomeownerName: (payload: string) => void;
  selectedHomeownerName: string | null;
  isPermitionToApartmentStatusPatch: boolean;
  printIssueCertificate: () => void;
  handleUpdatePhoneNumber: (payload: {
    id: string;
    data: HomeownerAccountUpdateRequest;
  }) => void;
};
