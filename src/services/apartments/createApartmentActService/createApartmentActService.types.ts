import { AddApartmentActRequest } from 'api/types';
import { createApartmentActService } from './createApartmentActService.model';

export type CreateActFormPayload = Omit<AddApartmentActRequest, 'apartmentId'>;

export type CreateActFormType =
  typeof createApartmentActService.forms.createActForm;
