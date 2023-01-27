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
import _ from 'lodash';

$isAddContractorsModalVisible.on(
  merge([
    addContractorsButtonMenuClicked,
    cancelAddingContractorsButtonClicked,
    postContractorsFx.done,
  ]),
  (isVisible) => !isVisible,
);

$isFailedAddingContractor
  .on(postContractorsFx.failData, () => true)
  .reset(postContractorsFx, addContractorsForm.submit);

postContractorsFx.use(postContractors);

forward({
  from: addContractorsForm.formValidated,
  to: postContractorsFx,
});

$contractors.on(postContractorsFx.doneData, (contractors, contractor) =>
  _.concat(contractors || [], contractor),
);

forward({
  from: postContractorsFx.doneData,
  to: addContractorsForm.reset,
});
