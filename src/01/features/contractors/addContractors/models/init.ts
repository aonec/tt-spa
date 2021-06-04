import { $isFailedAddingContractor, addContractorsForm } from './index';
import {
  $isAddContractorsModalVisible,
  addContractorsButtonMenuClicked,
  cancelAddingContractorsButtonClicked,
  postContractorsFx,
} from '.';
import { forward, merge } from 'effector';
import { $contractors } from '../../displayContractors/models';
import { postContractors } from '01/_api/contractors';

$isAddContractorsModalVisible.on(
  merge([
    addContractorsButtonMenuClicked,
    cancelAddingContractorsButtonClicked,
    postContractorsFx.done,
  ]),
  (isVisible) => !isVisible
);

$isFailedAddingContractor
  .on(postContractorsFx.failData, () => true)
  .reset(addContractorsForm.formValidated);

postContractorsFx.use(postContractors);

forward({
  from: addContractorsForm.formValidated,
  to: postContractorsFx,
});

$contractors.on(postContractorsFx.doneData, (contractors, contractor) =>
  contractors ? [...contractors, contractor] : [contractor]
);
