import { combine, createDomain, forward, sample } from 'effector';
import { HomeownerAccountCreateRequest } from 'api/types';
import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { postHomeownerAccount } from './createHomeownerService.api';
import { message } from 'antd';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { CreateHomeownerPayload } from './createHomeownerService.types';

const domain = createDomain('createHomeownerService');

const handleCreateHomeowner =
  domain.createEvent<HomeownerAccountCreateRequest>();
const handleConfirmationModalClose = domain.createEvent();
const onForced = domain.createEvent();

const createHomeownerFx = domain.createEffect<
  CreateHomeownerPayload,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(postHomeownerAccount);

const openCreateHomeownerModal = domain.createEvent();
const closeCreateHomeownerModal = domain.createEvent();

const $createHomeownerPayloadData = domain
  .createStore<HomeownerAccountCreateRequest | null>(null)
  .on(handleCreateHomeowner, (_, formData) => formData)
  .reset(closeCreateHomeownerModal);

const $isModalOpen = domain
  .createStore(false)
  .on(openCreateHomeownerModal, () => true)
  .reset(closeCreateHomeownerModal, createHomeownerFx.doneData);

const $samePersonalAccountNumderId = domain
  .createStore<number | null>(null)
  .on(createHomeownerFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

const $isForced = domain
  .createStore<boolean>(false)
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
