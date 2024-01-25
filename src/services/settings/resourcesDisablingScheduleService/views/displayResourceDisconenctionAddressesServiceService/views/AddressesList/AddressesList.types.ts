export type AddressesListProps = {
  streets: StreetWithBuildings[];
};

export type StreetWithBuildings = {
  street: string | null;
  addresses: ShortAddress[];
};

export type ShortAddress = {
  number: string | null;
  corpus: string | null;
};
