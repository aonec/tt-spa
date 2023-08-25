import {
  EManagingFirmTaskType,
  ETaskConfirmationType,
  ETaskConfirmationTypeStringDictionaryItem,
} from 'api/types';

export type CompletionSelectProps = {
  taskConfirmationTypes?: ETaskConfirmationTypeStringDictionaryItem[] | null;
  handleChangeConfirmation: (confirmationType: ETaskConfirmationType) => void;
  taskType?: EManagingFirmTaskType;
};
