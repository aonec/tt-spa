import { combine, createDomain, guard, sample } from 'effector';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';
import { SplitPersonalNumberSubmitData } from './splitPersonalNumberService.types';
import { doesApartmentExist, splitHomeownerAccount } from './splitPersonalNumberService.api';
import { HomeownerAccountSplitRequest } from 'myApi';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';

const domain = createDomain('splitPersonalNumberService');

const goBackStage = domain.createEvent();
const goNextStage = domain.createEvent();

const handleForceConfirmationModalClose = domain.createEvent();
const onForced = domain.createEvent();

const handleSubmitSplitStage =
  domain.createEvent<SplitPersonalNumberSubmitData>();

const splitPersonalNumber = domain.createEvent();

const $splitPersonalNumberData = domain
  .createStore<SplitPersonalNumberSubmitData | null>(null)
  .on(handleSubmitSplitStage, (oldData, newData) => ({
    ...oldData,
    ...newData,
  }));
// .reset(resetter);

const $isForced = domain
  .createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleForceConfirmationModalClose);

const $stageNumber = domain
  .createStore<number>(1)
  .on(goNextStage, (stageNumber) => stageNumber + 1)
  .on(goBackStage, (stageNumber) => stageNumber - 1);
// .reset(resetter);

guard({
  source: $stageNumber,
  clock: handleSubmitSplitStage,
  filter: (stageNumber) => stageNumber < 3,
  target: goNextStage,
});

const checkApartmentExistingFx = domain.createEffect<{
  housingStockId: number;
  apartmentNumber: string;
}, number | null>(doesApartmentExist)

const splitPersonalNumberFx = domain.createEffect<
  {
    data: HomeownerAccountSplitRequest;
    isForced?: boolean;
  },
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(splitHomeownerAccount);

const $checkedExistingApartmentId = domain.createStore<number | null>(null)
  .on(checkApartmentExistingFx.doneData, (_, id) => {
    return id;
  })
  // .reset(SplitPersonalNumberGate.close, closeConfirmExistingApartmentModal);


const $samePersonalAccountNumderId = domain
  .createStore<number | null>(null)
  .on(splitPersonalNumberFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleForceConfirmationModalClose);

const $isConfirmationModalOpen = $samePersonalAccountNumderId.map(Boolean);

sample({
  clock: checkApartmentExistingFx.doneData ,
  filter:(value) => value === null ,
  fn: () => false,
  target: splitPersonalNumber,
});

sample({
  clock: splitPersonalNumber,

  source: combine(
    $splitPersonalNumberData,
    $isForced,
    (splitPersonalNumberData, isForced) => ({
      splitPersonalNumberData,
      isForced,
    }),
  ),
  fn: (store) => {
    return {

      data: {accountForClosing: store.splitPersonalNumberData?.replaceableAccountId ,
      homeownerAccountForSplittedApartment: HomeownerAccountCreateRequest,
      individualDeviceIdsForSwitch: store.splitPersonalNumberData?.individualDeviceIdsForSwitch,
      useExistingApartment: boolean,
      newApartment:store.splitPersonalNumberData },
      isForced : isForced
    } as {
      data: HomeownerAccountSplitRequest;
      isForced?: boolean;
    };
  },
  target: splitPersonalNumberFx,
});

export const splitPersonalNumberService = {
  inputs: { goNextStage, goBackStage, handleSubmitSplitStage },
  outputs: {
    $stageNumber,
    $apartment: apartmentProfileService.outputs.$apartment,
  },
  gates: { ApartmentGate: apartmentProfileService.gates.ApartmentGate },
};
