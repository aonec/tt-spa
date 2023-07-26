import { UpdateApartmentRequestPayload } from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';

export type CommentFieldProps = {
  apartmentId: number;
  comment: string | null;
  handleUpdateApartment: (payload: UpdateApartmentRequestPayload) => void;
};
