import { ApartmentResponse } from 'myApi';
import { UpdateApartmentRequestPayload } from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';

export type ApartmentInfoProps = {
  apartment: ApartmentResponse;
  handleUpdateApartment: (payload: UpdateApartmentRequestPayload) => void;
  handlePauseApartment: () => void;
  handleCancelPauseApartment: () => void;
  openEditPersonalNumberModal: () => void;
};
