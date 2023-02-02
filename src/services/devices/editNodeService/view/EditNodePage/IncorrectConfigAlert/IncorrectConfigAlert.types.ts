import {
  EPipeNodeValidationErrorStringDictionaryItem,
  EPipeNodeValidationWarningStringDictionaryItem,
} from 'myApi';

export type IncorrectConfigAlertProps = {
  validationResultArray: (
    | EPipeNodeValidationErrorStringDictionaryItem
    | EPipeNodeValidationWarningStringDictionaryItem
  )[];
};
