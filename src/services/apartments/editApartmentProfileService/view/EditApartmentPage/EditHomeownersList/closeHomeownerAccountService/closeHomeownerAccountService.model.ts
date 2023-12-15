import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { HomeownerAccountCloseRequest } from 'api/types';
import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { postCloseHomeownerApartment } from './closeHomeownerAccountService.api';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const handleCloseHomeownerAccount =
  createEvent<Omit<HomeownerAccountCloseRequest, 'homeownerAccountId'>>();

const closeHomeownerAccountFx = createEffect<
  HomeownerAccountCloseRequest,
  void,
  EffectFailDataAxiosError
>(postCloseHomeownerApartment);

const openClosingHomeownerModal = createEvent<string>();

const closeClosingHomeownerModal = createEvent();

const $homeownerId = createStore<string | null>(null)
  .on(openClosingHomeownerModal, (_, id) => id)
  .reset(closeClosingHomeownerModal, closeHomeownerAccountFx.doneData);

const $isModalOpen = $homeownerId.map(Boolean);

sample({
  source: $homeownerId,
  clock: handleCloseHomeownerAccount,
  fn: (homeownerAccountId, { closedAt }) => ({
    homeownerAccountId: homeownerAccountId!,
    closedAt,
  }),
  target: closeHomeownerAccountFx,
});

sample({
  clock: closeHomeownerAccountFx.doneData,
  target: editApartmentProfileService.inputs.refetchAaprtment,
});

closeHomeownerAccountFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

const $isLoading = closeHomeownerAccountFx.pending;

export const closeHomeownerAccountService = {
  inputs: {
    closeClosingHomeownerModal,
    handleCloseHomeownerAccount,
    openClosingHomeownerModal,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
  },
};
