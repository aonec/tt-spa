import { replaceHomeownerAccount } from './../../../../_api/homeowners';
import {
  setSwitchRequestStatus,
  switchPersonalNumber,
  switchPersonalNumberFx,
} from './index';
import { $switchRequestStatus } from '.';
import { combine, sample } from 'effector';
import { personalNumberEditForm } from '../../editPersonalNumber/models';
import { HomeownerGate } from '../../displayHomeowner/models';
import { $apartment } from '01/features/apartments/displayApartment/models';
import moment from 'moment';

switchPersonalNumberFx.use(replaceHomeownerAccount);

$switchRequestStatus
  .on(setSwitchRequestStatus, (_, status) => status)
  .on(switchPersonalNumberFx.doneData, () => 'done')
  .on(switchPersonalNumberFx.failData, () => 'failed');

sample({
  clock: switchPersonalNumber,
  source: combine(
    HomeownerGate.state,
    personalNumberEditForm.$values,
    $apartment,
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
    ) => {
      return {
        ReplaceableAccountId: gatestate?.id,
        newHomeownerAccount: {
          personalAccountNumber,
          paymentCode,
          name,
          phoneNumber,
          openAt: moment(openAt).toISOString(true),
          apartmentId: apartment?.id,
          IsMainOnApartment: isMainAccountingNumber,
        },
      };
    },
  ),
  target: switchPersonalNumberFx as any,
});
