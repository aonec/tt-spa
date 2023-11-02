import { createEffect, createEvent, createStore } from 'effector';
import { combine, forward, sample } from 'effector';
import { HomeownerAccountCreateRequest } from 'api/types';
import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { postHomeownerAccount } from './createHomeownerService.api';
import { message } from 'antd';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { CreateHomeownerPayload } from './createHomeownerService.types';

const handleCreateHomeowner = createEvent<HomeownerAccountCreateRequest>();
const handleConfirmationModalClose = createEvent();
const onForced = createEvent();

const createHomeownerFx = createEffect<
  CreateHomeownerPayload,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(postHomeownerAccount);

const openCreateHomeownerModal = createEvent();
const closeCreateHomeownerModal = createEvent();

const $createHomeownerPayloadData =
  createStore<HomeownerAccountCreateRequest | null>(null)
    .on(handleCreateHomeowner, (_, formData) => formData)
    .reset(closeCreateHomeownerModal);

const $isModalOpen = createStore(false)
  .on(openCreateHomeownerModal, () => true)
  .reset(closeCreateHomeownerModal, createHomeownerFx.doneData);

const $samePersonalAccountNumderId = createStore<number | null>(null)
  .on(createHomeownerFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

const $isForced = createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleConfirmationModalClose);

const $isConfirmationModalOpen = $samePersonalAccountNumderId.map(Boolean);

sample({
  clock: [handleCreateHomeowner, onForced],
  source: combine(
    $createHomeownerPayloadData,
    $isForced,
    (payloadData, isForced) => {
      return { body: payloadData, isForced };
    },
  ),
  filter: (payload): payload is CreateHomeownerPayload => Boolean(payload),
  target: createHomeownerFx,
});

forward({
  from: createHomeownerFx.doneData,
  to: editApartmentProfileService.inputs.refetchAaprtment,
});

createHomeownerFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

const $isLoading = createHomeownerFx.pending;

export const createHomeownerService = {
  inputs: {
    openCreateHomeownerModal,
    closeCreateHomeownerModal,
    handleCreateHomeowner,
    handleConfirmationModalClose,
    onForced,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
    $samePersonalAccountNumderId,
    $isForced,
    $isConfirmationModalOpen,
  },
};
