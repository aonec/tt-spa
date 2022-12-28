import { ApartmentResponse } from 'myApi';
import { GetApartmentsRequestPayload } from '../../../ApartmentReadingsService.types';

export type ApartmentProfileProps = {
  handleSearchApartment: (payload: GetApartmentsRequestPayload) => void;
  isLoadingApartment: boolean;
  apartment: ApartmentResponse | null;
};
