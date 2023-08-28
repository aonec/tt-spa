import {
  ApartmentByAddressFilterResponse,
  BuildingByFilterResponse,
} from 'api/types';
import { SearchIndividualDevicesRequestPayload } from '../../individualDevicesViewByAddressService.types';

export type IndividualDevicesApartmentsListProps = {
  housingsByFilter: BuildingByFilterResponse | null;
  isLoading: boolean;
  individualDevicesApartmentsList?: ApartmentByAddressFilterResponse[] | null;
  updateSearchPayload: (payload: SearchIndividualDevicesRequestPayload) => void;
};
