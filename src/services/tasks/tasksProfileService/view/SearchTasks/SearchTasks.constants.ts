import { TaskPaginationOrderRule } from 'api/types';

export const AddressSearchFieldsNameLookup: { [key: string]: string } = {
  city: 'City',
  street: 'Street',
  corpus: 'Corpus',
  house: 'HousingStockNumber',
};

export const TaskPaginationOrderRuleDictionary: {
  [key in TaskPaginationOrderRule]: string;
} = {
  [TaskPaginationOrderRule.ConfirmationTime]: 'Дате подтверждения',
  [TaskPaginationOrderRule.CreationTime]: 'Дате создания',
  [TaskPaginationOrderRule.TimeStatus]: 'Статусу выполнения',
};
