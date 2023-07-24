import { Event } from 'effector';
import {
  ApartmentResponse,
  HomeownerAccountResponse,
} from 'myApi';
import { ReactNode } from 'react';
import {
  UpdateApartmentRequestPayload,
  UpdateHomeownerRequestPayload,
} from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';
import { ContextMenuElement } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';

export type ApartmentInfoProps = {
  apartment: ApartmentResponse;
  handleUpdateApartment: (payload: UpdateApartmentRequestPayload) => void;
  setSelectedHomeownerName: (payload: string) => void;
  menuButtons?: ContextMenuElement[];
  additionalHeaderInfo?: ReactNode;
  handleUpdateHomeowner?: (payload: UpdateHomeownerRequestPayload) => void;
  isUpdateHomeownerLoading?: boolean;
};
