import { createDomain, forward, sample } from 'effector';
import { HomeownerAccountCloseRequest } from 'myApi';
import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { postCloseHomeownerApartment } from './closeHomeownerAccountService.api';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('closeHomeownerAccountService');

const handleCloseHomeownerAccount =
  domain.createEvent<
    Omit<HomeownerAccountCloseRequest, 'homeownerAccountId'>
  >();

const closeHomeownerAccountFx = domain.createEffect<
  HomeownerAccountCloseRequest,
  void,
  EffectFailDataAxiosError
>(postCloseHomeownerApartment);

const openClosingHomeownerModal = domain.createEvent<string>();

const closeClosingHomeownerModal = domain.createEvent();

const $homeownerId = domain
  .createStore<string | null>(null)
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

forward({
  from: closeHomeownerAccountFx.doneData,
  to: editApartmentProfileService.inputs.refetchAaprtment,
});

const $isLoading = closeHomeownerAccountFx.pending;

closeHomeownerAccountFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

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
