import { combine, createDomain, forward, sample } from 'effector';
import { HomeownerAccountCreateRequest } from 'myApi';
import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { postHomeownerAccount } from './createHomeownerService.api';
import { message } from 'antd';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';

const domain = createDomain('createHomeownerService');

const handleCreateHomeowner =
  domain.createEvent<HomeownerAccountCreateRequest>();
const handleConfirmationModalClose = domain.createEvent();
const onForced = domain.createEvent();

const createHomeownerFx = domain.createEffect<
  HomeownerAccountCreateRequest,
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
    (payloadData, isForced): HomeownerAccountCreateRequest | null => {
      return payloadData && { ...payloadData, isForced };
    },
  ),
  filter: (payload): payload is HomeownerAccountCreateRequest =>
    Boolean(payload),
  target: createHomeownerFx,
});

forward({
  from: createHomeownerFx.doneData,
  to: editApartmentProfileService.inputs.refetchAaprtment,
});

forward({
  from: createHomeownerFx.doneData,
  to: handleConfirmationModalClose,
});

const $isLoading = createHomeownerFx.pending;

createHomeownerFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }

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
