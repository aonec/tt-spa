import { addContractorsForm } from './index';
import { postContractors } from '../../../../_api/contractors';
import {
  $isAddContractorsModalVisible,
  addContractorsButtonMenuClicked,
  cancelAddingContractorsButtonClicked,
  postContractorsFx,
} from '.';
import { forward, merge } from 'effector';

$isAddContractorsModalVisible.on(
  merge([
    addContractorsButtonMenuClicked,
    cancelAddingContractorsButtonClicked,
    postContractorsFx.done,
  ]),
  (isVisible) => !isVisible
);

postContractorsFx.use(postContractors);

forward({
  from: addContractorsForm.formValidated,
  to: postContractorsFx,
});

// $contractors.on(postContractorsFx.doneData, (contractors, newContractor) => [...contractors, newContractor]))
