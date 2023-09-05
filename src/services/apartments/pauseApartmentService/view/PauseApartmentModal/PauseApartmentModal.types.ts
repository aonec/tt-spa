import { IndividualDeviceWithExpiredCheckingDateResponse } from 'api/types';
import { PauseApartmentFormType } from '../../pauseApartmentService.types';

export type Props = {
  isLoading: boolean;
  isOpen: boolean;
  problemDevices: IndividualDeviceWithExpiredCheckingDateResponse[];
  pauseApartmentModalCancelButtonClicked: () => void;
  form: PauseApartmentFormType;
  apartmentId: number;
};
