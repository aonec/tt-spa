import { HomeownerAccountUpdateRequest } from 'myApi';

export type PhoneNumberProps = {
  phoneNumber: string | null;
  homeownerId: string | undefined
  handleUpdate:
    | ((payload: { id: string; data: HomeownerAccountUpdateRequest }) => void)
    | undefined;
};
