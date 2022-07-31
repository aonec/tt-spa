import { replaceHomeownerAccount } from './../../../../_api/homeowners';
import {
  setSwitchRequestStatus,
  switchPersonalNumber,
  switchPersonalNumberFx,
} from './index';
import { $switchRequestStatus } from '.';
import { combine, sample } from 'effector';
import { personalNumberEditForm } from '../../editPersonalNumber/models';
import { $homeowner } from '../../displayHomeowner/models';
import moment from 'moment';
import { $apartment } from '../../../apartments/displayApartment/models';

switchPersonalNumberFx.use(replaceHomeownerAccount);

$switchRequestStatus
  .on(setSwitchRequestStatus, (_, status) => status)
  .on(switchPersonalNumberFx.doneData, () => 'done')
  .on(switchPersonalNumberFx.failData, () => 'failed');

sample({
  clock: switchPersonalNumber,
  source: combine(
    $homeowner,
    personalNumberEditForm.$values,
    $apartment,
    (
      homeowner,
      { personalAccountNumber, paymentCode, name, phoneNumber, openAt },
      apartment
    ) => {
      return {
        ReplaceableAccountId: homeowner?.id!,
        newHomeownerAccount: {
          personalAccountNumber,
          paymentCode,
          name,
          phoneNumber,
          openAt: moment(openAt).toISOString(true),
          apartmentId: apartment?.id,
        },
      };
    }
  ),
  target: switchPersonalNumberFx as any,
});
