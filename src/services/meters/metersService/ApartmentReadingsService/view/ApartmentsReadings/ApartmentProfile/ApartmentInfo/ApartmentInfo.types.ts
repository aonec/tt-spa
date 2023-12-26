import { ApartmentResponse } from 'api/types';
import { ReactNode } from 'react';
import {
  EditPhoneNumberRequest,
  RemovePhoneNumberRequest,
  UpdateApartmentRequestPayload,
  UpdateHomeownerRequestPayload,
} from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';
import { ContextMenuElement } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';

export type ApartmentInfoProps = {
  apartment: ApartmentResponse;
  handleUpdateApartment: (payload: UpdateApartmentRequestPayload) => void;
  setSelectedHomeownerName: (payload: string | null) => void;
  menuButtons?: ContextMenuElement[];
  additionalHeaderInfo?: ReactNode;
  handleUpdateHomeowner?: (payload: UpdateHomeownerRequestPayload) => void;
  isUpdateHomeownerLoading?: boolean;
  addPhoneNumber?: (payload: EditPhoneNumberRequest) => void;
  deletePhoneNumber?: (payload: RemovePhoneNumberRequest) => void;
};
