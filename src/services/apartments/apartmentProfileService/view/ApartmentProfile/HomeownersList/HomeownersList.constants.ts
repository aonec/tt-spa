import { EPersonType } from 'api/types';

export const PersonTypeDictionary: { [key in EPersonType]: string } = {
  [EPersonType.Natural]: 'Физическое лицо',
  [EPersonType.Juristic]: 'Юридическое лицо',
};
