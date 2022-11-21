import { ApartmentResponse } from 'myApi';

export type EditApartmentPageProps = {
  apartment: ApartmentResponse | null;
  isLoading: boolean;
};
