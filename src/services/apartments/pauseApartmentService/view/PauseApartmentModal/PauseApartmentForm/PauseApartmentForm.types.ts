import { IndividualDeviceWithExpiredCheckingDateResponse } from 'api/types';
import { PauseApartmentFormType } from 'services/apartments/pauseApartmentService/pauseApartmentService.types';

export type Props = {
  problemDevices: IndividualDeviceWithExpiredCheckingDateResponse[];
  form: PauseApartmentFormType;
  formId: string;
  apartmentId: number;
};
