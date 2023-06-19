import { createDomain, sample } from 'effector';
import { ApartmentResponse } from 'myApi';
import { message } from 'antd';
import { fetchCreateSeal } from './createSealService.api';
import { EffectFailDataAxiosError } from 'types';
import { AppointmentCreateRequest } from 'myApi-test';

const domain = createDomain('createSealService');

const createSealAppointment =
  domain.createEvent<Omit<AppointmentCreateRequest, 'apartmentId'>>();
const createSealAppointmentFx = domain.createEffect<
  AppointmentCreateRequest,
  void,
  EffectFailDataAxiosError
>(fetchCreateSeal);

const openModal = domain.createEvent<ApartmentResponse>();
const closeModal = domain.createEvent();
const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(openModal, (_, apartment) => apartment)
  .reset(closeModal);

const $isOpen = $apartment.map(Boolean);

sample({
  source: $apartment,
  clock: createSealAppointment,
  fn: (apartment, payload) => ({ ...payload, apartmentId: apartment.id }),
  filter: Boolean,
  target: createSealAppointmentFx,
});

createSealAppointmentFx.doneData.watch(() =>
  message.success('Заявка на опломбировку успешно создана!'),
);

createSealAppointmentFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

sample({
  clock: createSealAppointmentFx.doneData,
  target: closeModal,
});

export const createSealService = {
  inputs: {
    openModal,
    closeModal,
    createSealAppointment,
  },
  outputs: {
    $isOpen,
    $apartment,
  },
};
