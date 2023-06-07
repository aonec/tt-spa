import { IndividualDeviceWithExpiredCheckingDateResponse } from 'myApi';

export type Props = {
  isLoading: boolean;
  isOpen: boolean;
  problemDevices: IndividualDeviceWithExpiredCheckingDateResponse[];
  apartmentId: number;
  pauseApartmentModalCancelButtonClicked: () => void;
};
