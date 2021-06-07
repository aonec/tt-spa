import { deleteContractor } from '01/_api/contractors';
import { combine, guard, sample } from 'effector';
import {
  $contractorIdToDelete,
  deleteContractorButtonClicked,
  deleteContractorCancelButtonClicked,
  deleteContractorFx,
  deleteContractorConfirmButtonClicked,
} from '.';
import { $contractors } from '../../displayContractors/models';

$contractorIdToDelete
  .on(deleteContractorButtonClicked, (_, id) => id)
  .reset(deleteContractorCancelButtonClicked);

guard({
  source: $contractorIdToDelete,
  clock: deleteContractorConfirmButtonClicked,
  filter: (id): id is number => id !== null,
  target: deleteContractorFx,
});

deleteContractorFx.use(deleteContractor);

sample({
  source: combine($contractorIdToDelete, $contractors),
  clock: deleteContractorFx.doneData,
  fn: ([id, contractors]) =>
    contractors?.filter((elem) => elem.id !== id) || null,
  target: $contractors,
});
