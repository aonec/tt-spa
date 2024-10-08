import {
  ApartmentResponse,
  AppointmentResponse,
  IndividualDeviceMountPlaceForFilterResponse,
} from 'api/types';
import {
  AddPhoneNumberRequest,
  GetApartmentsRequestPayload,
  RemovePhoneNumberRequest,
  UpdateApartmentRequestPayload,
  UpdateHomeownerRequestPayload,
  ReplacePhoneNumberRequest,
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
  setSelectedHomeownerName: (payload: string | null) => void;
  selectedHomeownerName: string | null;
  isPermitionToApartmentStatusPatch: boolean;
  allIndividualDeviceMountPlaces:
    | IndividualDeviceMountPlaceForFilterResponse[]
    | null;
  printIssueCertificate: () => void;
  handleUpdateHomeowner: (payload: UpdateHomeownerRequestPayload) => void;
  isUpdateHomeownerLoading: boolean;
  isApartmentFetched: boolean;
  nearestAppointment: AppointmentResponse | null;
  addPhoneNumber: (payload: AddPhoneNumberRequest) => void;
  deletePhoneNumber: (payload: RemovePhoneNumberRequest) => void;
  replacePhoneNumber: (payload: ReplacePhoneNumberRequest) => void;
};

export enum SearchMode {
  Apartment = 'apartment',
  SerialNumber = 'serialNumber',
}
