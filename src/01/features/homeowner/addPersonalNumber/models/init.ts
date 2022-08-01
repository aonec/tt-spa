import {
  $addPersonalNumberRequestStatus,
  addPersonalNmberSaveButtonClicked,
  setAddPersonalNumberStatus,
} from './index';
import { addHomeowner } from './../../../../_api/homeowners';
import { addPersonalNumberFx } from '.';
import { combine, sample } from 'effector';
import { personalNumberEditForm } from '../../editPersonalNumber/models';
import { $apartment } from '../../../apartments/displayApartment/models';

addPersonalNumberFx.use(addHomeowner);

sample({
  source: combine(
    personalNumberEditForm.$values,
    $apartment,
    (
      { personalAccountNumber, name, paymentCode, phoneNumber, openAt },
      apartment
    ) => {
      return {
        name,
        paymentCode,
        phoneNumber,
        openAt: String(openAt),
        personalAccountNumber,
        apartmentId: apartment?.id,
      };
    }
  ),
  clock: addPersonalNmberSaveButtonClicked,
  target: addPersonalNumberFx,
});

$addPersonalNumberRequestStatus
  .on(addPersonalNumberFx.done, () => 'done')
  .on(addPersonalNumberFx.fail, () => 'failed')
  .on(setAddPersonalNumberStatus, (_, status) => status);
