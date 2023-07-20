import { Event } from 'effector';
import { HomeownerAccountResponse } from 'myApi';
import { UpdateHomeownerRequestPayload } from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';

export type PhoneNumberProps = {
  phoneNumber: string | null;
  homeownerId: string | undefined;
  handleUpdate?: (payload: UpdateHomeownerRequestPayload) => void;
  isUpdateHomeownerLoading?: boolean;
  handleHomeownerUpdated?: Event<HomeownerAccountResponse>;
};
