import {
  $checkedExistingApartmentId,
  checkApartmentExistingFx,
  closeConfirmExistingApartmentModal,
  homeownerAccountForSplittedApartmentForm,
  newApartmentPersonalNumberForm,
  previousSplitPersonalNumberPage,
  saveSplitPersonalNumberForm,
  splitPersonalNumber,
  splitPersonalNumberFx,
  SplitPersonalNumberGate,
  transferDevicesForm,
} from './index';
import {
  $splitPersonalNumberStageNumber,
  nextSplitPersonalNumberPage,
} from '.';
import { combine, forward, guard, sample } from 'effector';
import { splitHomeownerAccount } from '01/_api/homeowners';
import { HomeownerGate, fetchHomeownerFx } from '../../displayHomeowner/models';
import moment from 'moment';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { doesApartmentExist } from '01/_api/housingStocks';

splitPersonalNumberFx.use(splitHomeownerAccount);
checkApartmentExistingFx.use(doesApartmentExist);

$splitPersonalNumberStageNumber.reset(SplitPersonalNumberGate.close);

$checkedExistingApartmentId
  .on(checkApartmentExistingFx.doneData, (_, id) => {
    return id;
  })
  .reset(SplitPersonalNumberGate.close, closeConfirmExistingApartmentModal);

forward({
  from: SplitPersonalNumberGate.close,
  to: [
    transferDevicesForm.resetValues,
    homeownerAccountForSplittedApartmentForm.resetValues,
    newApartmentPersonalNumberForm.resetValues,
  ],
});

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
  source: combine($apartment, HomeownerGate.state, (apartment, gateState) => {
    const source = { apartment, gateState };
    return source;
  }),
  fn: (source) => {
    const homeownerAccount = source.apartment?.homeownerAccounts?.find(
      (account) => account.id === source.gateState.id
    );
    const form = {
      phoneNumber: homeownerAccount?.phoneNumber || '',
      name: homeownerAccount?.name || '',
    };
    return form;
  },
  target: homeownerAccountForSplittedApartmentForm.setForm,
});

sample({
  source: combine(
    homeownerAccountForSplittedApartmentForm.$values,
    newApartmentPersonalNumberForm.$values,
    transferDevicesForm.$values,
    HomeownerGate.state,
    $apartment,
    (
      splittedApartmentHomeownerAccount,
      newApartmentHomeownerAccount,
      transferedDevices,
      gateState,
      apartment
    ) => {
      const accountForClosing = {
        HomeownerAccountId: gateState.id,
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
  clock: splitPersonalNumber,
  fn: (store, clock) =>
    ({ ...store, useExistingApartment: Boolean(clock) } as any),
  target: splitPersonalNumberFx,
});

sample({
  clock: guard({
    source: checkApartmentExistingFx.doneData,
    filter: (value) => value === null,
  }),
  fn: () => false,
  target: splitPersonalNumber,
});

sample({
  clock: saveSplitPersonalNumberForm,
  source: combine(
    $apartment,
    newApartmentPersonalNumberForm.fields.apartmentNumber.$value,
    (apartment, apartmentNumber) => ({
      housingStockId: apartment?.housingStock?.id!,
      apartmentNumber: apartmentNumber!,
    })
  ),
  target: checkApartmentExistingFx,
});
