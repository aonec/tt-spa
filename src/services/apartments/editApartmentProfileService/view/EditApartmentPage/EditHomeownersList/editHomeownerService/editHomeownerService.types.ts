import { HomeownerAccountUpdateRequest } from 'myApi';
import { EditHomeownerPayload } from '../HomeownerForm/EditHomeownerForm.types';

export type EditHomeownerRequestPayload = HomeownerAccountUpdateRequest & {
  id: string;
};

export type EditHomeownerFormPayload = EditHomeownerPayload & { id: string };
