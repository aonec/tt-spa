import {
  $addPersonalNumberRequestStatus,
  addPersonalNmberSaveButtonClicked,
  setAddPersonalNumberStatus,
} from './index';
import { addHomeowner } from './../../../../_api/homeowners';
import { addPersonalNumberFx } from '.';
import { combine, sample } from 'effector';
import { personalNumberEditForm } from '../../editPersonalNumber/models';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { HomeownerAccountCreateServiceModel } from 'myApi';

addPersonalNumberFx.use(addHomeowner);

sample({
  source: combine(
    personalNumberEditForm.$values,
    $apartment,
    (
      { personalAccountNumber, name, paymentCode, phoneNumber, openAt },
      apartment
    ) => {
      const data: HomeownerAccountCreateServiceModel = {
        name,
        paymentCode: String(paymentCode),
        phoneNumber,
        openAt: String(openAt),
        personalAccountNumber,
        apartmentId: apartment?.id,
      };

      return data;
    }
  ),
  clock: addPersonalNmberSaveButtonClicked,
  target: addPersonalNumberFx as any,
});

$addPersonalNumberRequestStatus
  .on(addPersonalNumberFx.done, () => 'done')
  .on(addPersonalNumberFx.fail, () => 'failed')
  .on(setAddPersonalNumberStatus, (_, status) => status);
