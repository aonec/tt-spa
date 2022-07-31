import { combine, guard, sample } from 'effector';
import {
  $contractorIdToDelete,
  $isDeletionContractorFailed,
  deleteContractorButtonClicked,
  deleteContractorCancelButtonClicked,
  deleteContractorFx,
  deleteContractorConfirmButtonClicked,
  $deletedСonctractorName,
} from '.';
import { deleteContractor } from '../../../../_api/contractors';
import { $contractors } from '../../displayContractors/models';

const contractorDeleted = sample({
  source: combine($contractorIdToDelete, $contractors),
  clock: deleteContractorFx.doneData,
  fn: ([id, contractors]) =>
    contractors?.filter((elem) => elem.id !== id) || null,
  target: $contractors,
});

$contractorIdToDelete
  .on(deleteContractorButtonClicked, (_, { id }) => id)
  .reset(deleteContractorCancelButtonClicked, contractorDeleted);

$isDeletionContractorFailed
  .on(deleteContractorFx.failData, () => true)
  .reset(deleteContractorButtonClicked, deleteContractorCancelButtonClicked);

guard({
  source: $contractorIdToDelete,
  clock: deleteContractorConfirmButtonClicked,
  filter: (id): id is number => id !== null,
  target: deleteContractorFx,
});

deleteContractorFx.use(deleteContractor);

$deletedСonctractorName
  .on(deleteContractorButtonClicked, (_, { name }) => name)
  .reset(deleteContractorCancelButtonClicked, contractorDeleted);
