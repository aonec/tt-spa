import { PersonType } from 'myApi';

export const PersonTypeDictionary: { [key in PersonType]: string } = {
  [PersonType.Natural]: 'Физическое лицо',
  [PersonType.Juristic]: 'Юридическое лицо',
};
