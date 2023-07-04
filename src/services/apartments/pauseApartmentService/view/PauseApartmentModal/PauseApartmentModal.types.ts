import { IndividualDeviceWithExpiredCheckingDateResponse } from 'myApi';
import { SetApartmentStatusRequest } from '../../pauseApartmentService.types';

export type Props = {
  isLoading: boolean;
  isOpen: boolean;
  problemDevices: IndividualDeviceWithExpiredCheckingDateResponse[];
  apartmentId: number;
  pauseApartmentModalCancelButtonClicked: () => void;
  pauseApartment: (payload: SetApartmentStatusRequest) => void;
};
