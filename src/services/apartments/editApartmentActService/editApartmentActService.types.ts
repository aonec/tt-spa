import { UpdateApartmentActRequest } from 'api/types';
import { editApartmentActService } from './editApartmentActService.model';

export type EditActFormPayload = Omit<UpdateApartmentActRequest, 'apartmentId'>;

export type EditActRequestPayload = {
  act: EditActFormPayload;
  actId: number;
};

export type EditActFormType = typeof editApartmentActService.forms.editActForm;
