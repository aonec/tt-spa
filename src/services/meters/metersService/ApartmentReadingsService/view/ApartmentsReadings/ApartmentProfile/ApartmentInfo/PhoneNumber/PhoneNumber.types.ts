import { Event } from 'effector';
import { HomeownerAccountResponse, HomeownerAccountUpdateRequest } from 'myApi';

export type PhoneNumberProps = {
  phoneNumber: string | null;
  homeownerId: string | undefined;
  handleUpdate?: (payload: {
    id: string;
    data: HomeownerAccountUpdateRequest;
  }) => void;
  isUpdateHomeownerLoading?: boolean;
  handleHomeownerUpdated?: Event<HomeownerAccountResponse>;
};
