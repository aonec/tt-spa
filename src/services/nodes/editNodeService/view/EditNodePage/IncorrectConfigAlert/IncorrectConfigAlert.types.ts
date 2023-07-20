import { EPipeNodeValidationMessageStringDictionaryItem } from 'api/types';

export type IncorrectConfigAlertProps = {
  validationResultArray: EPipeNodeValidationMessageStringDictionaryItem[];
  description: string;
};
