import { ApartmentResponse } from 'api/myApi';

export type ApartmentAlertsProps = {
  apartment: ApartmentResponse;
  handleCancelPauseApartment: () => void;
  isPermitionToApartmentStatusPatch: boolean;
};
