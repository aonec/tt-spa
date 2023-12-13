import { createEffect, createEvent, createStore } from 'effector';
import { editApartmentProfileService } from 'services/apartments/editApartmentProfileService/editApartmentProfileService.model';
import { combine, sample } from 'effector';
import {
  EditHomeownerFormPayload,
  EditHomeownerRequestPayload,
} from './editHomeownerService.types';
import { putHomeowner } from './editHomeownerService.api';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { message } from 'antd';

const handleEditHomeowner = createEvent<EditHomeownerFormPayload>();

const editHomeownerFx = createEffect<
  EditHomeownerRequestPayload,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(putHomeowner);

const openEditHomeownerModal = createEvent<EditHomeownerFormPayload>();
const closeEditHomeownerModal = createEvent();

const handleConfirmationModalClose = createEvent();
const onForced = createEvent();

const $housingStockPayload = createStore<EditHomeownerFormPayload | null>(null)
  .on(openEditHomeownerModal, (_, payload) => payload)
  .reset(closeEditHomeownerModal, editHomeownerFx.doneData);

const $isModalOpen = $housingStockPayload.map(Boolean);

const $editHomeownerFormData = createStore<EditHomeownerFormPayload | null>(
  null,
).on(handleEditHomeowner, (_, data) => data);

const $samePersonalAccountNumderId = createStore<number | null>(null)
  .on(editHomeownerFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

const $isConfirmationModalOpen = $samePersonalAccountNumderId.map(Boolean);

const $isForced = createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleConfirmationModalClose);

const $isLoading = editHomeownerFx.pending;

sample({
  clock: [handleEditHomeowner, onForced],
  source: combine(
    $editHomeownerFormData,
    $isForced,
    (payloadData, isForced) => {
      if (!payloadData) return null;

      const {
        isMainOnApartment,
        name,
        paymentCode,
        personType,
        personalAccountNumber,
        phoneNumber,
      } = payloadData;

      const res: EditHomeownerRequestPayload = {
        id: payloadData.id,
        body: {
          isMainOnApartment,
          name,
          paymentCode,
          personType,
          personalAccountNumber,
          phoneNumber,
        },
        isForced: isForced,
      };

      return res;
    },
  ),
  filter: (payload): payload is EditHomeownerRequestPayload => Boolean(payload),
  target: editHomeownerFx,
});

sample({
  clock: editHomeownerFx.doneData,
  target: [
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
