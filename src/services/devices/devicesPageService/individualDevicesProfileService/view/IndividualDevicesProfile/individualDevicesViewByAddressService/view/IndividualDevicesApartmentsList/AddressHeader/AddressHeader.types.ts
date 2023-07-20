import { HousingByFilterResponse } from 'api/types';
import { SearchIndividualDevicesRequestPayload } from '../../../individualDevicesViewByAddressService.types';

export type AddressHeaderProps = {
  housingsByFilter: HousingByFilterResponse;
  updateSearchPayload: (payload: SearchIndividualDevicesRequestPayload) => void;
};
