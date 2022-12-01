import { combine, createDomain, forward, sample, Store } from 'effector';
import { HomeownerAccountCloseRequest } from 'myApi';
import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { postCloseHomeownerApartment } from './closeHomeownerAccountService.api';

const domain = createDomain('closeHomeownerAccountService');

const handleCloseHomeownerAccount = domain.createEvent<
  Omit<HomeownerAccountCloseRequest, 'homeownerAccountId'>
>();

const closeHomeownerAccountFx = domain.createEffect<
  HomeownerAccountCloseRequest,
  void
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

export const closeHomeownerAccountService = {
  inputs: {
    closeClosingHomeownerModal,
    handleCloseHomeownerAccount,
    openClosingHomeownerModal
  },
  outputs: {
    $isModalOpen,
    $isLoading,
  },
};
