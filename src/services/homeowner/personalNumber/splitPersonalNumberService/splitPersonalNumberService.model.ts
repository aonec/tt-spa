import { combine, createDomain, guard, sample } from 'effector';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';
import {
  AddNewApartmentStage,
  CheckApartmentRequest,
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
} from 'api/types';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import moment from 'moment';
import { createGate } from 'effector-react';
import { message } from 'antd';

const domain = createDomain('splitPersonalNumberService');

const SplitPageGate = createGate();

const goBackStage = domain.createEvent();
const goNextStage = domain.createEvent();

const handleForceConfirmationModalClose = domain.createEvent();
const onForced = domain.createEvent();

const handleSubmitSwitchStage = domain.createEvent<SwitchStage>();
const handleSubmitAddNewApartmentStage =
  domain.createEvent<AddNewApartmentStage>();
const handleSubmitTransferDevicesStage = domain.createEvent<TransferStage>();

const handleCheckApartmentExist = domain.createEvent();

const $apartment = apartmentProfileService.outputs.$apartment;

const $switchStageData = domain
  .createStore<SwitchStage | null>(null)
  .on(handleSubmitSwitchStage, (_, data) => data)
  .reset(SplitPageGate.close);
const $addNewApartmentStageData = domain
  .createStore<AddNewApartmentStage | null>(null)
  .on(handleSubmitAddNewApartmentStage, (_, data) => data)
  .reset(SplitPageGate.close);
const $transferDevicesData = domain
  .createStore<TransferStage | null>(null)
  .on(handleSubmitTransferDevicesStage, (_, data) => data)
  .reset(SplitPageGate.close);

const splitPersonalNumber = domain.createEvent<boolean>();
const handleSplitInExistApart = domain.createEvent();

const $isForced = domain
  .createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleForceConfirmationModalClose);

const $stageNumber = domain
  .createStore<number>(1)
  .on(goNextStage, (stageNumber) => stageNumber + 1)
  .on(goBackStage, (stageNumber) => stageNumber - 1)
  .reset(SplitPageGate.close);

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
  .on(checkApartmentExistingFx.doneData, (_, id) => id)
  .reset(SplitPageGate.close);

const $samePersonalAccountNumderId = domain
  .createStore<number | null>(null)
  .on(splitPersonalNumberFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset([handleForceConfirmationModalClose, SplitPageGate.close]);

const $isConfirmationModalOpen = $samePersonalAccountNumderId.map(Boolean);

sample({
  clock: handleCheckApartmentExist,
  source: combine(
    $apartment,
    $addNewApartmentStageData,
    (apartment, addNewApartmentStageData) => ({
      housingStockId: apartment?.housingStock?.id,
      apartmentNumber: addNewApartmentStageData?.apartmentNumber.toString(),
    }),
  ),
  filter: (data) =>
    Boolean(data.apartmentNumber) && Boolean(data.housingStockId),
  fn: (data) => {
    return data as unknown as CheckApartmentRequest;
  },
  target: checkApartmentExistingFx,
});

sample({
  clock: checkApartmentExistingFx.doneData,
  filter: (existApartId) => existApartId === null,
  fn: () => false,
  target: splitPersonalNumber,
});

sample({
  clock: handleSplitInExistApart,
  fn: () => true,
  target: splitPersonalNumber,
});

sample({
  clock: onForced,
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
        openAt: switchStageData?.form.openAt,
      };

      const newHomeownerAccount = {
        ...addNewApartmentStageData,
        openAt: addNewApartmentStageData?.openAt,
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

splitPersonalNumberFx.failData.watch((error) => {
  if (
    error.response.data.error.Code === 'HomeownerAccountAlreadyExistConflict'
  ) {
    return;
  }

  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

const successSplit = splitPersonalNumberFx.doneData;

successSplit.watch(() => message.success('Квартира успшно разделена'));

const $isCheckApartLoading = checkApartmentExistingFx.pending;

export const splitPersonalNumberService = {
  inputs: {
    goNextStage,
    goBackStage,
    handleSubmitTransferDevicesStage,
    handleSubmitAddNewApartmentStage,
    handleSubmitSwitchStage,
    handleCheckApartmentExist,
    handleForceConfirmationModalClose,
    onForced,
    successSplit,
    handleSplitInExistApart,
  },
  outputs: {
    $stageNumber,
    $apartment,
    $switchStageData,
    $addNewApartmentStageData,
    $transferDevicesData,
    $individualDevices,
    $isConfirmationModalOpen,
    $samePersonalAccountNumderId,
    $checkedExistingApartmentId,
    $isCheckApartLoading,
  },
  gates: {
    ApartmentGate: apartmentProfileService.gates.ApartmentGate,
    IndividualDevicesGate,
    SplitPageGate,
  },
};
