import { SearchFieldType } from './AddressSearch.types';

export const SearchFieldsLabels: { [key in SearchFieldType]: string } = {
  [SearchFieldType.City]: 'Город',
  [SearchFieldType.Street]: 'Улица',
  [SearchFieldType.House]: 'Дом',
  [SearchFieldType.Corpus]: 'Корпус',
  [SearchFieldType.Apartment]: 'Квартира',
};
