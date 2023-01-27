import { createDomain, forward } from 'effector';
import { HomeownerAccountCreateServiceModel } from 'myApi';
import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { postHomeownerAccount } from './createHomeownerService.api';

const domain = createDomain('createHomeownerService');

const handleCreateHomeowner =
  domain.createEvent<HomeownerAccountCreateServiceModel>();

const createHomeownerFx = domain.createEffect(postHomeownerAccount);

const openCreateHomeownerModal = domain.createEvent();
const closeCreateHomeownerModal = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openCreateHomeownerModal, () => true)
  .reset(closeCreateHomeownerModal, createHomeownerFx.doneData);

forward({
  from: handleCreateHomeowner,
  to: createHomeownerFx,
});

forward({
  from: createHomeownerFx.doneData,
  to: editApartmentProfileService.inputs.refetchAaprtment,
});

const $isLoading = createHomeownerFx.pending;

export const createHomeownerService = {
  inputs: {
    openCreateHomeownerModal,
    closeCreateHomeownerModal,
    handleCreateHomeowner,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
  },
};
