import { StageChanges } from '../../setExecutionPostponedDateService.types';

export type ExecutionPostponedDatePickerProps = {
  handleStageChanges: ({
    applicationPostponeDate,
    comment,
  }: StageChanges) => void;
};
