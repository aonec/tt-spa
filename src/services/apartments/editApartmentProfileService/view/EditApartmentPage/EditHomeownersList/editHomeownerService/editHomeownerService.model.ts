import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { createDomain, forward } from 'effector';
import { EditHomeownerFormPayload, EditHomeownerRequestPayload } from './editHomeownerService.types';
import { putHomeowner } from './editHomeownerService.api';

const domain = createDomain('editHomeownerService');

const handleEditHomeowner = domain.createEvent<EditHomeownerRequestPayload>();

const editHomeownerFx = domain.createEffect<EditHomeownerRequestPayload, void>(putHomeowner);

const openEditHomeownerModal = domain.createEvent<EditHomeownerFormPayload>();
const closeEditHomeownerModal = domain.createEvent();

const $housingStockPayload = domain
  .createStore<EditHomeownerFormPayload | null>(null)
  .on(openEditHomeownerModal, (_, payload) => payload)
  .reset(closeEditHomeownerModal, editHomeownerFx.doneData);

const $isModalOpen = $housingStockPayload.map(Boolean);

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
    openEditHomeownerModal,
    closeEditHomeownerModal,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
    $housingStockPayload
  },
};
