import { replaceHomeownerAccount } from './../../../../_api/homeowners';
import {
  $isForced,
  $samePersonalAccountNumderId,
  handleConfirmationModalClose,
  onForced,
  setSwitchRequestStatus,
  switchPersonalNumber,
  switchPersonalNumberFx,
} from './index';
import { $switchRequestStatus } from '.';
import { combine, forward, sample } from 'effector';
import { personalNumberEditForm } from '../../editPersonalNumber/models';
import { HomeownerGate } from '../../displayHomeowner/models';
import { $apartment } from '01/features/apartments/displayApartment/models';
import moment from 'moment';
import { HomeownerAccountReplaceRequest } from 'myApi';

switchPersonalNumberFx.use(replaceHomeownerAccount);

$switchRequestStatus
  .on(setSwitchRequestStatus, (_, status) => status)
  .on(switchPersonalNumberFx.doneData, () => 'done')
  .on(switchPersonalNumberFx.failData, () => 'failed');

forward({
  from: onForced,
  to: switchPersonalNumber,
});

sample({
  clock: switchPersonalNumber,
  source: combine(
    HomeownerGate.state,
    personalNumberEditForm.$values,
    $apartment,
    $isForced,
    (
      gatestate,
      {
        personalAccountNumber,
        paymentCode,
        name,
        phoneNumber,
        openAt,
        isMainAccountingNumber,
      },
      apartment,
      isForced,
    ) => {
      return {
        replaceableAccountId: gatestate?.id,
        newHomeownerAccount: {
          personalAccountNumber,
          paymentCode,
          name,
          phoneNumber,
          openAt: moment(openAt).toISOString(true),
          apartmentId: apartment?.id,
          IsMainOnApartment: isMainAccountingNumber,
        },
        isForced,
      } as HomeownerAccountReplaceRequest;
    },
  ),
  target: switchPersonalNumberFx,
});

$samePersonalAccountNumderId
  .on(switchPersonalNumberFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

$isForced.on(onForced, () => true).reset(handleConfirmationModalClose);

$samePersonalAccountNumderId.reset(handleConfirmationModalClose);

forward({
  from: switchPersonalNumberFx.doneData,
  to: handleConfirmationModalClose,
});
