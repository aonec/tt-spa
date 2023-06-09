import { IndividualDeviceMountPlaceForFilterResponse } from 'myApi';

export type DevicesSearchProps = {
  handleClickDevice: () => void;
  apartmentId: number | undefined;
  allIndividualDeviceMountPlaces:
    | IndividualDeviceMountPlaceForFilterResponse[]
    | null;
};
