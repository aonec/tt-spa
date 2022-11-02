import {
  ApartmentByAddressFilterResponse,
  HousingByFilterResponse,
} from 'myApi';

export type IndividualDevicesApartmentsListProps = {
  housingsByFilter: HousingByFilterResponse | null;
  isLoading: boolean;
  individualDevicesApartmentsList?: ApartmentByAddressFilterResponse[] | null;
};
