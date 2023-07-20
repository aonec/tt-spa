import { EPersonType } from 'api/myApi';

export const PersonTypeDictionary: { [key in EPersonType]: string } = {
  [EPersonType.Natural]: 'Физическое лицо',
  [EPersonType.Juristic]: 'Юридическое лицо',
};
