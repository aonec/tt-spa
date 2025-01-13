import { ExistingApartmentNumberType } from 'services/addressSearchService/addressSearchService.types';

export enum SearchFieldType {
  City = 'city',
  Street = 'street',
  House = 'house',
  Corpus = 'corpus',
  Apartment = 'apartment',
  Question = 'question',
}

export type AddressSearchValues = {
  city?: string | null;
  street?: string | null;
  house?: string | null;
  corpus?: string | null;
  apartment?: string | null;
  question?: string | null;
};

export type CustomTemplateType = {
  fieldType: SearchFieldType;
  templateValue: string;
}[];

export type AddressSearchProps = {
  values: AddressSearchValues;
  handleChange: (field: SearchFieldType, value: string) => void;
  handleSubmit: () => void;
  streets: string[];
  cities: string[];
  fields: SearchFieldType[];
  customTemplate?: CustomTemplateType;
  showLabels?: boolean;
  disabledFields?: SearchFieldType[];
  className?: string;
  isError: boolean;
  isFocus: boolean;
  handleSearchApartNumber: (payload: AddressSearchValues) => void;
  existingApartmentNumbers: ExistingApartmentNumberType[];
};
