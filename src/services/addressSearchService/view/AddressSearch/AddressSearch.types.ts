export type AddressSearchValues = {
  city: string;
  street: string;
  house: string;
  corpus: string;
  apartment: string;
};

export type AddressSearchProps = {
  values: AddressSearchValues;
  handleChange: (
    field: 'city' | 'street' | 'house' | 'corpus' | 'apartment',
    value: string
  ) => void;
  handleSubmit: () => void;
  streets: string[];
  cities: string[];
};
