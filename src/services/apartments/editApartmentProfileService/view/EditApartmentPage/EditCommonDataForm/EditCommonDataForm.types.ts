import { ApartmentResponse } from 'myApi';
import { PutApartment } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.types';

export type EditCommonDataFormProps = {
  apartment: ApartmentResponse;
  handleUpdateApartment: (payload: PutApartment) => void;
  isUpdatingApartmentLoading: boolean;
};
