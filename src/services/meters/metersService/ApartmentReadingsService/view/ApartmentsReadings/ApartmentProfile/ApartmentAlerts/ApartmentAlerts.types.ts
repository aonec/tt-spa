import { ApartmentResponse } from 'api/types';

export type ApartmentAlertsProps = {
  apartment: ApartmentResponse;
  handleCancelPauseApartment: () => void;
  isPermitionToApartmentStatusPatch: boolean;
};
