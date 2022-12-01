import { HomeownerAccountUpdateRequest } from 'myApi';
import { EditHomeownerPayload } from '../EditHomeownerForm/EditHomeownerForm.types';

export type EditHomeownerRequestPayload = HomeownerAccountUpdateRequest & {
  id: string;
};

export type EditHomeownerFormPayload = EditHomeownerPayload & { id: string };
