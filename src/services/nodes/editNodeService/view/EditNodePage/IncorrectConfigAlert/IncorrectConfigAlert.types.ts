import { EPipeNodeValidationMessageStringDictionaryItem } from 'api/myApi';

export type IncorrectConfigAlertProps = {
  validationResultArray: EPipeNodeValidationMessageStringDictionaryItem[];
  description: string;
};
