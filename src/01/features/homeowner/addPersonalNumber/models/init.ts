import {
  $addPersonalNumberRequestStatus,
  $isForced,
  $samePersonalAccountNumderId,
  addPersonalNmberSaveButtonClicked,
  handleConfirmationModalClose,
  onForced,
  setAddPersonalNumberStatus,
} from './index';
import { addHomeowner } from './../../../../_api/homeowners';
import { addPersonalNumberFx } from '.';
import { combine, forward, sample } from 'effector';
import { personalNumberEditForm } from '../../editPersonalNumber/models';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { HomeownerAccountCreateRequest } from 'myApi';

addPersonalNumberFx.use(addHomeowner);

sample({
  clock: addPersonalNmberSaveButtonClicked,
  source: combine(
    personalNumberEditForm.$values,
    $apartment,
    $isForced,
    (
      {
        personalAccountNumber,
        name,
        phoneNumber,
        openAt,
        isMainAccountingNumber,
      },
      apartment,
      isForced,
    ) => {
      const data: HomeownerAccountCreateRequest = {
        name,
        phoneNumber,
        openAt: String(openAt),
        personalAccountNumber: personalAccountNumber!,
        apartmentId: apartment?.id!,
        isMainOnApartment: isMainAccountingNumber,
        isForced: isForced,
      };

      return data;
    },
  ),
  target: addPersonalNumberFx,
});

forward({
  from: onForced,
  to: addPersonalNmberSaveButtonClicked,
});

$addPersonalNumberRequestStatus
  .on(addPersonalNumberFx.done, () => 'done')
  .on(addPersonalNumberFx.fail, () => 'failed')
  .on(setAddPersonalNumberStatus, (_, status) => status);

$samePersonalAccountNumderId
  .on(addPersonalNumberFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

$isForced.on(onForced, () => true).reset(handleConfirmationModalClose);

$samePersonalAccountNumderId.reset(handleConfirmationModalClose);

forward({
  from: addPersonalNumberFx.doneData,
  to: handleConfirmationModalClose,
});
