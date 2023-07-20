import { ApartmentResponse, IndividualDeviceListItemResponse } from 'api/types';

export type ConfirmUsingExistingApartmentFormProps = {
  devices: IndividualDeviceListItemResponse[];
  apartment: ApartmentResponse | null;
  isPending: boolean;
  isApartmentHasHomeowners: boolean;
  isApartmentHasDevices: boolean;
};
