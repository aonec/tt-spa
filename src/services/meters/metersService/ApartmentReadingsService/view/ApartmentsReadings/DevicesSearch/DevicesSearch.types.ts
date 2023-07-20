import { IndividualDeviceMountPlaceForFilterResponse } from 'api/myApi';

export type DevicesSearchProps = {
  handleClickDevice: () => void;
  apartmentId: number | undefined;
  allIndividualDeviceMountPlaces:
    | IndividualDeviceMountPlaceForFilterResponse[]
    | null;
};
