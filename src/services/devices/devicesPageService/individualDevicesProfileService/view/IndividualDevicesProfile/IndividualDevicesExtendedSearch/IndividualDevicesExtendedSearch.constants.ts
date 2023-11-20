import { EApartmentStatus, EExpiresDateAt, EResourceType } from 'api/types';

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

export const expiresCheckingDateAtLookup: {
  [key in EExpiresDateAt]: string | null;
} = {
  [EExpiresDateAt.NextMonth]: 'В ближайший месяц',
  [EExpiresDateAt.NextTwoMonth]: 'В следующие два месяца',
  [EExpiresDateAt.Past]: 'Истекла',
};

export const formTranslateLookup: { [key: string]: string } = {
  city: 'City',
  street: 'Street',
  house: 'HouseNumber',
  corpus: 'HouseCorpus',
};
