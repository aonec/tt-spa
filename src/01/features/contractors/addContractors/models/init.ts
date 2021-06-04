import { addContractorsForm } from './index';
import { postContractors } from '../../../../_api/contractors';
import {
  $isAddContractorsModalVisible,
  addContractorsButtonMenuClicked,
  cancelAddingContractorsButtonClicked,
  postContractorsFx,
} from '.';
import { forward, merge, sample } from 'effector';
import { $contractors } from '../../displayContractors/models';

$isAddContractorsModalVisible.on(
  merge([
    addContractorsButtonMenuClicked,
    cancelAddingContractorsButtonClicked,
    postContractorsFx.done,
  ]),
  (isVisible) => !isVisible
);

postContractorsFx.use(
  // () =>
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       reject({ message: 'Ошибка' });
  //     }, 2000);
  //   })

  postContractors
);

forward({
  from: addContractorsForm.formValidated,
  to: postContractorsFx,
});

$contractors.on(postContractorsFx.doneData, (contractors, contractor) =>
  contractors ? [...contractors, contractor] : [contractor]
);

// $contractors.on(postContractorsFx.doneData, (contractors, newContractor) => [...contractors, newContractor]))
