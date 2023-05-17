export type FindApartmentParams = {
  City: string;
  Street: string;
  HousingNumber: string;
  HousingCorpus?: string;
  ApartmentNumber: string;
};

export type FindAddressFilter = {
  Street?: string;
  HousingNumber?: string;
  ApartmentNumber?: string;
};

export type AddressIdSearchContainerProps = {
  dataKey: string;
  onEnter?: (index: number) => void;
};
