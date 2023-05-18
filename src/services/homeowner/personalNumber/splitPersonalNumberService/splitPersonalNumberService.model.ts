import { combine, createDomain, guard, sample } from 'effector';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';
import {
  AddNewApartmentStage,
  GetIndividualDeviceRequestParams,
  SwitchStage,
  TransferStage,
} from './splitPersonalNumberService.types';
import {
  doesApartmentExist,
  getIndividualDevices,
  splitHomeownerAccount,
} from './splitPersonalNumberService.api';
import {
  HomeownerAccountSplitRequest,
  IndividualDeviceListItemResponse,
} from 'myApi';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import moment from 'moment';
import { createGate } from 'effector-react';

const domain = createDomain('splitPersonalNumberService');

const goBackStage = domain.createEvent();
const goNextStage = domain.createEvent();

const handleForceConfirmationModalClose = domain.createEvent();
const onForced = domain.createEvent();

const handleSubmitSwitchStage = domain.createEvent<SwitchStage>();
const handleSubmitAddNewApartmentStage =
  domain.createEvent<AddNewApartmentStage>();
const handleSubmitTransferDevicesStage = domain.createEvent<TransferStage>();

const $apartment = apartmentProfileService.outputs.$apartment;

const $switchStageData = domain
  .createStore<SwitchStage | null>(null)
  .on(handleSubmitSwitchStage, (_, data) => data);
const $addNewApartmentStageData = domain
  .createStore<AddNewApartmentStage | null>(null)
  .on(handleSubmitAddNewApartmentStage, (_, data) => data);
const $transferDevicesData = domain
  .createStore<TransferStage | null>(null)
  .on(handleSubmitTransferDevicesStage, (_, data) => data);

const splitPersonalNumber = domain.createEvent<boolean>();

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
  clock: [
    handleSubmitSwitchStage,
    handleSubmitAddNewApartmentStage,
    handleSubmitTransferDevicesStage,
  ],
  filter: (stageNumber) => stageNumber < 3,
  target: goNextStage,
});

const IndividualDevicesGate = createGate<GetIndividualDeviceRequestParams>();

const getIndividualDevicesFx = domain.createEffect<
  GetIndividualDeviceRequestParams,
  {
    items: IndividualDeviceListItemResponse[];
  }
>(getIndividualDevices);

sample({
  source: IndividualDevicesGate.state.map((elem) => elem),
  filter: (params) => Object.values(params).length !== 0,
  target: getIndividualDevicesFx,
});

const $individualDevices = domain
  .createStore<{ items: IndividualDeviceListItemResponse[] } | null>(null)
  .on(getIndividualDevicesFx.doneData, (_, devices) => devices);

const checkApartmentExistingFx = domain.createEffect<
  {
    housingStockId: number;
    apartmentNumber: string;
  },
  number | null
>(doesApartmentExist);

const splitPersonalNumberFx = domain.createEffect<
  {
    data: HomeownerAccountSplitRequest;
    isForced?: boolean;
  },
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(splitHomeownerAccount);

const $checkedExistingApartmentId = domain
  .createStore<number | null>(null)
  .on(checkApartmentExistingFx.doneData, (_, id) => {
    return id;
  });
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
  clock: checkApartmentExistingFx.doneData,
  filter: (value) => value === null,
  fn: () => false,
  target: splitPersonalNumber,
});

sample({
  clock: splitPersonalNumber,
  source: combine(
    $apartment,
    $switchStageData,
    $addNewApartmentStageData,
    $transferDevicesData,
    $isForced,
    (
      apartment,
      switchStageData,
      addNewApartmentStageData,
      transferDevicesData,
      isForced,
    ) => {
      const accountForClosing = {
        homeownerAccountId: switchStageData?.replaceableAccountId,
        closedAt: moment().toISOString(true),
      };

      const homeownerAccountForSplittedApartment = {
        apartmentId: apartment?.id,
        ...switchStageData?.form,
        openAt: moment(switchStageData?.form.openAt).toISOString(true),
      };

      const newHomeownerAccount = {
        ...addNewApartmentStageData,
        openAt: moment(addNewApartmentStageData?.openAt).toISOString(true),
      };

      const newApartment = {
        housingStockId: apartment?.housingStock?.id,
        number: addNewApartmentStageData?.apartmentNumber,
        homeownerAccount: newHomeownerAccount,
      };

      const individualDeviceIdsForSwitch = [
        ...(transferDevicesData?.individualDeviceIdsForSwitch || []),
      ];

      return {
        data: {
          accountForClosing,
          homeownerAccountForSplittedApartment,
          individualDeviceIdsForSwitch,
          newApartment,
        },
        isForced,
      };
    },
  ),
  fn: (store, isSplitPersonalNumber) => {
    return {
      data: {
        ...store.data,
        useExistingApartment: isSplitPersonalNumber,
      },
      isForced: store.isForced,
    } as unknown as {
      data: HomeownerAccountSplitRequest;
      isForced?: boolean;
    };
  },
  target: splitPersonalNumberFx,
});

export const splitPersonalNumberService = {
  inputs: {
    goNextStage,
    goBackStage,
    handleSubmitTransferDevicesStage,
    handleSubmitAddNewApartmentStage,
    handleSubmitSwitchStage,
  },
  outputs: {
    $stageNumber,
    $apartment,
    $switchStageData,
    $addNewApartmentStageData,
    $transferDevicesData,
    $individualDevices,
  },
  gates: {
    ApartmentGate: apartmentProfileService.gates.ApartmentGate,
    IndividualDevicesGate,
  },
};
