import { ApartmentStatusSetRequest } from 'api/types';
import { pauseApartmentService } from './pauseApartmentService.models';

export type Props = {
  apartmentId: number;
};

export type SetApartmentStatusRequest = {
  apartmentId: number;
  requestPayload: ApartmentStatusSetRequest;
};

export type PauseApartmentFormType =
  typeof pauseApartmentService.forms.pauseApartmentForm;
