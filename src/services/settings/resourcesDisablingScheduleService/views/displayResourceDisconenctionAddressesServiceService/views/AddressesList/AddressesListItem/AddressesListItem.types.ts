import { BuildingShortResponse } from 'api/types';

export type AddressesListItemProps = {
  housingStocks: BuildingShortResponse[];
  street: string;
};
