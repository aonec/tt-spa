import {
  homeownerAccountForSplittedApartmentForm,
  newApartmentPersonalNumberForm,
  previousSplitPersonalNumberPage,
  saveSplitPersonalNumberForm,
  splitPersonalNumberFx,
  transferDevicesForm,
} from './index';
import {
  $splitPersonalNumberStageNumber,
  nextSplitPersonalNumberPage,
} from '.';
import { combine, forward, sample } from 'effector';
import { splitHomeownerAccount } from '01/_api/homeowners';
import { $homeowner } from '../../displayHomeowner/models';
import moment from 'moment';
import { $apartment } from '01/features/apartments/displayApartment/models';

splitPersonalNumberFx.use(splitHomeownerAccount);

$splitPersonalNumberStageNumber
  .on(nextSplitPersonalNumberPage, (value) => (value === 3 ? value : value + 1))
  .on(previousSplitPersonalNumberPage, (value) =>
    value === 1 ? value : value - 1
  );

forward({
  from: homeownerAccountForSplittedApartmentForm.formValidated,
  to: nextSplitPersonalNumberPage,
});

forward({
  from: newApartmentPersonalNumberForm.formValidated,
  to: nextSplitPersonalNumberPage,
});

sample({
  clock: transferDevicesForm.formValidated,
  fn: () => false,
  target: saveSplitPersonalNumberForm,
});

sample({
  source: combine(
    homeownerAccountForSplittedApartmentForm.$values,
    newApartmentPersonalNumberForm.$values,
    transferDevicesForm.$values,
    $homeowner,
    $apartment,
    (
      splittedApartmentHomeownerAccount,
      newApartmentHomeownerAccount,
      transferedDevices,
      homeowner,
      apartment
    ) => {
      const accountForClosing = {
        HomeownerAccountId: homeowner?.id!,
        closedAt: moment().toISOString(true),
      };

      const homeownerAccountForSplittedApartment = {
        apartmentId: apartment?.id,
        ...splittedApartmentHomeownerAccount,
        openAt: moment(splittedApartmentHomeownerAccount.openAt).toISOString(
          true
        ),
      };

      const newHomeownerAccount = {
        ...newApartmentHomeownerAccount,
        openAt: moment(newApartmentHomeownerAccount.openAt).toISOString(true),
      };

      const newApartment = {
        housingStockId: apartment?.housingStock?.id,
        number: newApartmentHomeownerAccount.apartmentNumber,
      };

      const individualDeviceIdsForSwitch = [
        ...transferedDevices.individualDeviceIdsForSwitch,
      ];

      return {
        accountForClosing,
        homeownerAccountForSplittedApartment,
        newHomeownerAccount,
        individualDeviceIdsForSwitch,
        newApartment,
      };
    }
  ),
  clock: saveSplitPersonalNumberForm,
  fn: (store, clock) => ({ ...store, useExistingApartment: clock } as any),
  target: splitPersonalNumberFx,
});
