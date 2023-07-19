import { Event } from 'effector';
import {
  ApartmentResponse,
  HomeownerAccountResponse,
  HomeownerAccountUpdateRequest,
} from 'myApi';
import { ReactNode } from 'react';
import { UpdateApartmentRequestPayload } from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';
import { ContextMenuElement } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';

export type ApartmentInfoProps = {
  apartment: ApartmentResponse;
  handleUpdateApartment: (payload: UpdateApartmentRequestPayload) => void;
  setSelectedHomeownerName: (payload: string) => void;
  menuButtons?: ContextMenuElement[];
  additionalHeaderInfo?: ReactNode;
  handleUpdatePhoneNumber?: (payload: {
    id: string;
    data: HomeownerAccountUpdateRequest;
  }) => void;
  isUpdateHomeownerLoading?: boolean;
  handleHomeownerUpdated?: Event<HomeownerAccountResponse>;
};
