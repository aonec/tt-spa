import { ApartmentResponse, IndividualDeviceListItemResponse } from 'api/myApi';

export type ConfirmUsingExistingApartmentFormProps = {
  devices: IndividualDeviceListItemResponse[];
  apartment: ApartmentResponse | null;
  isPending: boolean;
  isApartmentHasHomeowners: boolean;
  isApartmentHasDevices: boolean;
};
