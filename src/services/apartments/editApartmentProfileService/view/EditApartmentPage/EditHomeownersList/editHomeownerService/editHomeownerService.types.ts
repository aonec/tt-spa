import { HomeownerAccountUpdateRequest } from 'api/types';
import { EditHomeownerPayload } from '../HomeownerForm/EditHomeownerForm.types';

export type EditHomeownerRequestPayload = {
  id: string;
  body: HomeownerAccountUpdateRequest;
  isForced?: boolean;
};

export type EditHomeownerFormPayload = EditHomeownerPayload & { id: string };
