import { EditApartmentCheckPayload } from '01/features/apartments/checkApartment/models';
import { ApartmentCheckResponse } from 'myApi';

export interface CheckHistoryComponentProps {
  apartmentId: number;
  documents: ApartmentCheckResponse[] | null;
  pending: boolean;
  openCheckApartmentModal(payload: void): void;
  removeApartmentCheck(id: number): void;
  openEditApartmentCheckModal(payload: EditApartmentCheckPayload): void;
}

export interface CheckHistoryDocumentProps {
  document: ApartmentCheckResponse;
  removeApartmentCheck(id: number): void;
  openEditApartmentCheckModal(payload: EditApartmentCheckPayload): void;
}
