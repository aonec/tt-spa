import { BuildingByFilterResponse } from 'api/types';
import { SearchIndividualDevicesRequestPayload } from '../../../individualDevicesViewByAddressService.types';

export type AddressHeaderProps = {
  housingsByFilter: BuildingByFilterResponse;
  updateSearchPayload: (payload: SearchIndividualDevicesRequestPayload) => void;
};
