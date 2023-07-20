import { BuildingShortResponse } from 'api/myApi';

export type AddressesListItemProps = {
  housingStocks: BuildingShortResponse[];
  street: string;
};
