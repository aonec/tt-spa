import { IndividualDeviceMountPlaceForFilterResponse } from 'myApi';
import { SearchIndividualDevicesRequestPayload } from '../../individualDevicesViewByAddressService.types';

export type IndividualDevicesAddressSearchProps = {
  setIndividualDeviceSearchRequestPayload: (
    payload: SearchIndividualDevicesRequestPayload
  ) => void;
  filters: SearchIndividualDevicesRequestPayload;
  clearSearchPayload: () => void;
  mountPlaces: IndividualDeviceMountPlaceForFilterResponse[];
};
