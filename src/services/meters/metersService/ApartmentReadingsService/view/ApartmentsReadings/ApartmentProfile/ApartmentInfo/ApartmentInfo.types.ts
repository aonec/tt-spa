import { ApartmentResponse } from 'myApi';
import { UpdateApartmentRequestPayload } from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';
import { ContextMenuElement } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';

export type ApartmentInfoProps = {
  apartment: ApartmentResponse;
  handleUpdateApartment: (payload: UpdateApartmentRequestPayload) => void;
  setSelectedHomeownerName: (payload: string) => void;
  menuButtons?: ContextMenuElement[];
};
