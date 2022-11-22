import {
  ApartmentByAddressFilterResponse,
  HousingByFilterResponse,
} from 'myApi';
import { SearchIndividualDevicesRequestPayload } from '../../individualDevicesViewByAddressService.types';

export type IndividualDevicesApartmentsListProps = {
  housingsByFilter: HousingByFilterResponse | null;
  isLoading: boolean;
  individualDevicesApartmentsList?: ApartmentByAddressFilterResponse[] | null;
  updateSearchPayload: (payload: SearchIndividualDevicesRequestPayload) => void;
};
