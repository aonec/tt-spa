import {
  EApartmentStatus,
  EClosingReason,
  EExpiresCheckingDateAt,
  EResourceType,
} from 'myApi';

export const resourcesNamesLookup: { [key in EResourceType]: string } = {
  [EResourceType.ColdWaterSupply]: 'ХВС',
  [EResourceType.HotWaterSupply]: 'ГВС',
  [EResourceType.Electricity]: 'ЭЭ',
  [EResourceType.Heat]: 'Тепло',
};

export const apartmentStatusesLookup: { [key in EApartmentStatus]: string } = {
  [EApartmentStatus.Debtor]: 'Должник',
  [EApartmentStatus.Ok]: 'Ок',
  [EApartmentStatus.Pause]: 'Пауза',
};

export const closingReasonLookup: { [key: string]: string | null } = {
  [EClosingReason.Manually]: 'Плановая замена',
  [EClosingReason.DeviceBroken]: 'Поломка',
  [EClosingReason.CertificateIssued]: 'Выдана справка',
};

export const expiresCheckingDateAtLookup: {
  [key in EExpiresCheckingDateAt]: string | null;
} = {
  [EExpiresCheckingDateAt.NextMonth]: 'Ближайший месяц',
  [EExpiresCheckingDateAt.NextTwoMonth]: 'В следующие два месяца',
  [EExpiresCheckingDateAt.Past]: 'Истекла',
};

export const formTranslateLookup: { [key: string]: string } = {
  city: 'City',
  street: 'Street',
  house: 'HouseNumber',
  corpus: 'HouseCorpus',
};
