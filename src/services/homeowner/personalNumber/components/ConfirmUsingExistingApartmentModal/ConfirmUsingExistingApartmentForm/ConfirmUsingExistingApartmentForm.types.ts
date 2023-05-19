import { ApartmentResponse, IndividualDeviceListItemResponse } from 'myApi';

export type ConfirmUsingExistingApartmentFormProps = {
  devices: IndividualDeviceListItemResponse[];
  apartment: ApartmentResponse | null;
  isPending: boolean;
};
