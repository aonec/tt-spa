import { deleteContractor } from '01/_api/contractors';
import { sample } from 'effector';
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

sample({
  clock: deleteContractorConfirmButtonClicked,
  source: $contractorIdToDelete.map((id) => id!),
  target: deleteContractorFx,
});

deleteContractorFx.use(deleteContractor);

$contractors.on(deleteContractorFx.doneData, (contractors, { id }) =>
  contractors?.filter((elem) => elem.id !== id)
);
