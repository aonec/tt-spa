import { FieldType } from './EditHomeownerField.types';

export const FieldTypeDictionary: { [key in FieldType]: string } = {
  [FieldType.Name]: 'name',
  [FieldType.PhoneNumber]: 'phoneNumber',
};
