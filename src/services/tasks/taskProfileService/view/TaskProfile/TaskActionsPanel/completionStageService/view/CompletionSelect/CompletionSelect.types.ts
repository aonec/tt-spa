import {
  ETaskConfirmationType,
  ETaskConfirmationTypeStringDictionaryItem,
} from 'myApi';

export type CompletionSelectProps = {
  taskConfirmationTypes?: ETaskConfirmationTypeStringDictionaryItem[] | null;
  handleChangeConfirmation: (confirmationType: ETaskConfirmationType) => void;
};
