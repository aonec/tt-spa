import { IndividualDeviceMountPlaceForFilterResponse } from 'api/types';

export type DevicesSearchProps = {
  handleClickDevice: () => void;
  apartmentId: number | undefined;
  allIndividualDeviceMountPlaces:
    | IndividualDeviceMountPlaceForFilterResponse[]
    | null;
};
