import { HousingByFilterResponse } from 'myApi';
import { SearchIndividualDevicesRequestPayload } from '../../../individualDevicesViewByAddressService.types';

export type AddressHeaderProps = {
  housingsByFilter: HousingByFilterResponse;
  updateSearchPayload: (payload: SearchIndividualDevicesRequestPayload) => void;
};
