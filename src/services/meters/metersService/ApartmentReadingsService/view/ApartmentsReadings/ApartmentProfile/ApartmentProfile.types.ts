import { ApartmentResponse, HomeownerAccountResponse } from 'api/types';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
  UpdateHomeownerRequestPayload,
} from '../../../ApartmentReadingsService.types';
import { Event } from 'effector';

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
  handleUpdatePhoneNumber: (payload: UpdateHomeownerRequestPayload) => void;
  isUpdateHomeownerLoading: boolean;
  handleHomeownerUpdated: Event<HomeownerAccountResponse>;
  isApartmentFetched: boolean;
};
