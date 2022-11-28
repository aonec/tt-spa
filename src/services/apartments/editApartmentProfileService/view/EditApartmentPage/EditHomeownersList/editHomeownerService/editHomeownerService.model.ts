import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { createDomain, forward } from 'effector';
import { EditHomeownerPayload } from '../EditHomeownerForm/EditHomeownerForm.types';

const domain = createDomain('editHomeownerService');

const handleEditHomeowner = domain.createEvent();

const editHomeownerFx = domain.createEffect();

const openCreateHomeownerModal = domain.createEvent();
const closeCreateHomeownerModal = domain.createEvent<EditHomeownerPayload>();

const $isModalOpen = domain
  .createStore(false)
  .on(openCreateHomeownerModal, () => true)
  .reset(closeCreateHomeownerModal, editHomeownerFx.doneData);

forward({
  from: handleEditHomeowner,
  to: editHomeownerFx,
});

forward({
  from: editHomeownerFx.doneData,
  to: editApartmentProfileService.inputs.refetchAaprtment,
});

const $isLoading = editHomeownerFx.pending;

export const editHomeownerService = {
  inputs: {
    handleEditHomeowner,
    openCreateHomeownerModal,
    closeCreateHomeownerModal,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
  },
};
