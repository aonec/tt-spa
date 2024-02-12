import { HomeownerAccountAddPhoneNumberRequest } from 'api/types';

export type EditHomeownerPhoneNumberContainerProps = {
  accId: string;
};

export type AddPhoneNumberRequestPayload = {
  id: string;
  data: HomeownerAccountAddPhoneNumberRequest;
};
