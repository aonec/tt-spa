import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { createDomain, forward } from 'effector';
import {
  EditHomeownerFormPayload,
  EditHomeownerRequestPayload,
} from './editHomeownerService.types';
import { putHomeowner } from './editHomeownerService.api';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('editHomeownerService');

const handleEditHomeowner = domain.createEvent<EditHomeownerRequestPayload>();

const editHomeownerFx = domain.createEffect<
  EditHomeownerRequestPayload,
  void,
  EffectFailDataAxiosError
>(putHomeowner);

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

editHomeownerFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
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
    $housingStockPayload,
  },
};
