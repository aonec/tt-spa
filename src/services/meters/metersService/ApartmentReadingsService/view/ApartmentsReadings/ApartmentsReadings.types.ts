import { ApartmentResponse } from 'myApi';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
} from '../../ApartmentReadingsService.types';

export type ApartmentsReadingsProps = {
  searchMode: SearchMode;
  setSearchMode: (mode: SearchMode) => void;
  handleSearchApartment: (payload: GetApartmentsRequestPayload) => void;
  isLoadingApartment: boolean;
  apartment: ApartmentResponse | null;
  handleUpdateApartment: (payload: UpdateApartmentRequestPayload) => void;
  handlePauseApartment: () => void;
  handleCancelPauseApartment: () => void;
  openEditPersonalNumberModal: () => void;
  setSelectedHomeownerName: (payload: string) => void;
  selectedHomeownerName: string | null;
};

export enum SearchMode {
  Apartment = 'apartment',
  SerialNumber = 'serialNumber',
}
