import { ApartmentResponse } from 'myApi';

export type ApartmentAlertsProps = {
  apartment: ApartmentResponse;
  handleCancelPauseApartment: () => void;
  isPermitionToApartmentStatusPatch: boolean;
};
