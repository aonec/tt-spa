import { AddressShortResponse } from 'api/types';

export type HousingStockNumberProps = {
  housingStock: AddressShortResponse & { isDistributed: boolean };
  currentStreetCheckedHousingStockIds: number[];
  setAddress: (payload: {
    isToAdd: boolean;
    address: AddressShortResponse;
  }) => void;
  street: string | null;
};
