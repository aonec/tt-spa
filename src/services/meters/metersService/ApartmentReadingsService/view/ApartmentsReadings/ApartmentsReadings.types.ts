import {
  ApartmentResponse,
  HomeownerAccountUpdateRequest,
  IndividualDeviceMountPlaceForFilterResponse,
} from 'myApi';
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
  openEditPersonalNumberModal: (payload: boolean) => boolean;
  setSelectedHomeownerName: (payload: string) => void;
  selectedHomeownerName: string | null;
  isPermitionToApartmentStatusPatch: boolean;
  allIndividualDeviceMountPlaces:
    | IndividualDeviceMountPlaceForFilterResponse[]
    | null;
  printIssueCertificate: () => void;
  handleUpdatePhoneNumber: (payload: {
    id: string;
    data: HomeownerAccountUpdateRequest;
  }) => void;
};

export enum SearchMode {
  Apartment = 'apartment',
  SerialNumber = 'serialNumber',
}
