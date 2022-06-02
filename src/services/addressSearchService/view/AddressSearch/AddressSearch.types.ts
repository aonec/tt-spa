export enum SearchFieldType {
  City = 'city',
  Street = 'street',
  House = 'house',
  Corpus = 'corpus',
  Apartment = 'apartment',
}

export type AddressSearchValues = {
  city?: string;
  street?: string;
  house?: string;
  corpus?: string;
  apartment?: string;
};

export type AddressSearchProps = {
  values: AddressSearchValues;
  handleChange: (field: SearchFieldType, value: string) => void;
  handleSubmit: () => void;
  streets: string[];
  cities: string[];
  lastField: SearchFieldType;
};
