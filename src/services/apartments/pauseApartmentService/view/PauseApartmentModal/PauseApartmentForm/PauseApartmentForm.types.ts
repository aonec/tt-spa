import { IndividualDeviceWithExpiredCheckingDateResponse } from 'api/types';
import { SetApartmentStatusRequest } from 'services/apartments/pauseApartmentService/pauseApartmentService.types';

export type Props = {
  problemDevices: IndividualDeviceWithExpiredCheckingDateResponse[];
  apartmentId: number;
  pauseApartment: (payload: SetApartmentStatusRequest) => void;
};
