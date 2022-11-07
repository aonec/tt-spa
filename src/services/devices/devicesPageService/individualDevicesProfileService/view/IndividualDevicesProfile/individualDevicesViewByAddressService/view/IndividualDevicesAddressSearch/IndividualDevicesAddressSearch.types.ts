import { HousingByFilterResponse } from 'myApi';
import { SearchIndividualDevicesRequestPayload } from '../../individualDevicesViewByAddressService.types';

export type IndividualDevicesAddressSearchProps = {
  setIndividualDeviceSearchRquestPayload: (
    payload: SearchIndividualDevicesRequestPayload
  ) => void;
};
