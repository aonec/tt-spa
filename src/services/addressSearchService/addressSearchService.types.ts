import {
  AddressSearchValues,
  SearchFieldType,
} from './view/AddressSearch/AddressSearch.types';

export type AddressSearchContainerProps = {
  lastField: SearchFieldType;
  handleSubmit: (values: AddressSearchValues) => void;
};
