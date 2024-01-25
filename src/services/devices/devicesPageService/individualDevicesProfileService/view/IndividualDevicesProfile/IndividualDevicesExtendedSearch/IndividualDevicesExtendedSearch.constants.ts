import { EApartmentStatus, EResourceType } from 'api/types';
import { EExpiresDateAtExtended } from './IndividualDevicesExtendedSearch.types';

export const resourcesNamesLookup: { [key in EResourceType]: string } = {
  [EResourceType.ColdWaterSupply]: 'ХВС',
  [EResourceType.HotWaterSupply]: 'ГВС',
  [EResourceType.Electricity]: 'ЭЭ',
  [EResourceType.Heat]: 'Тепло',
};

export const apartmentStatusesLookup: { [key in EApartmentStatus]: string } = {
  [EApartmentStatus.Debtor]: 'Должник',
  [EApartmentStatus.Ok]: 'Передают показания',
  [EApartmentStatus.Pause]: 'На паузе',
};

export const formTranslateLookup: { [key: string]: string } = {
  city: 'City',
  street: 'Street',
  house: 'HouseNumber',
  corpus: 'HouseCorpus',
};

export const expiresCheckingDateAt = [
  {
    title: 'Любая',
    name: EExpiresDateAtExtended.All,
  },
  {
    title: 'В ближайший месяц',
    name: EExpiresDateAtExtended.NextMonth,
  },
  {
    title: 'В ближайшие 2 месяца',
    name: EExpiresDateAtExtended.NextTwoMonth,
  },
  {
    title: 'Истекла',
    name: EExpiresDateAtExtended.Past,
  },
];
