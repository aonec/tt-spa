import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { combine, createDomain, forward, sample } from 'effector';
import {
  EditHomeownerFormPayload,
  EditHomeownerRequestPayload,
} from './editHomeownerService.types';
import { putHomeowner } from './editHomeownerService.api';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { message } from 'antd';

const domain = createDomain('editHomeownerService');

const handleEditHomeowner = domain.createEvent<EditHomeownerRequestPayload>();

const editHomeownerFx = domain.createEffect<
  EditHomeownerRequestPayload,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(putHomeowner);

const openEditHomeownerModal = domain.createEvent<EditHomeownerFormPayload>();
const closeEditHomeownerModal = domain.createEvent();

const handleConfirmationModalClose = domain.createEvent();
const onForced = domain.createEvent();

const $housingStockPayload = domain
  .createStore<EditHomeownerFormPayload | null>(null)
  .on(openEditHomeownerModal, (_, payload) => payload)
  .reset(closeEditHomeownerModal, editHomeownerFx.doneData);

const $isModalOpen = $housingStockPayload.map(Boolean);

const $editHomeownerFormData = domain
  .createStore<EditHomeownerRequestPayload | null>(null)
  .on(handleEditHomeowner, (_, data) => data);

const $samePersonalAccountNumderId = domain
  .createStore<number | null>(null)
  .on(editHomeownerFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

const $isConfirmationModalOpen = $samePersonalAccountNumderId.map(Boolean);

const $isForced = domain
  .createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleConfirmationModalClose);

const $isLoading = editHomeownerFx.pending;

sample({
  clock: [handleEditHomeowner, onForced],
  source: combine(
    $editHomeownerFormData,
    $isForced,
    (payloadData, isForced): EditHomeownerRequestPayload | null => {
      //Правки по isForced

      return payloadData && { ...payloadData };
    },
  ),
  filter: (payload): payload is EditHomeownerRequestPayload => Boolean(payload),
  target: editHomeownerFx,
});

forward({
  from: editHomeownerFx.doneData,
  to: [
    editApartmentProfileService.inputs.refetchAaprtment,
    handleConfirmationModalClose,
  ],
});

editHomeownerFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

export const editHomeownerService = {
  inputs: {
    handleEditHomeowner,
    openEditHomeownerModal,
    closeEditHomeownerModal,
    onForced,
    handleConfirmationModalClose,
  },
  outputs: {
    $isModalOpen,
    $isLoading,
    $housingStockPayload,
    $samePersonalAccountNumderId,
    $isForced,
    $isConfirmationModalOpen,
  },
};
