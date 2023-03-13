import { createDomain, forward } from 'effector';
import { HomeownerAccountCreateRequest } from 'myApi';
import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { postHomeownerAccount } from './createHomeownerService.api';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('createHomeownerService');

const handleCreateHomeowner =
  domain.createEvent<HomeownerAccountCreateRequest>();

const createHomeownerFx = domain.createEffect<
  HomeownerAccountCreateRequest,
  void,
  EffectFailDataAxiosError
>(postHomeownerAccount);

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
  },
  outputs: {
    $isModalOpen,
    $isLoading,
  },
};
