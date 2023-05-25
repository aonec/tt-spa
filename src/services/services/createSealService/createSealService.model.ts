import { createDomain } from 'effector';
import { sample } from 'lodash';
import { ApartmentResponse } from 'myApi';

const domain = createDomain('createSealService');

const createSealAppointment = domain.createEvent();
const createSealAppointmentFx = domain.createEffect();

const openModal = domain.createEvent<ApartmentResponse>();
const closeModal = domain.createEvent();
const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(openModal, (_, apartment) => apartment)
  .reset(closeModal);

const $isOpen = $apartment.map(Boolean);

sample({
  clock: createSealAppointment,
  to: createSealAppointmentFx,
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
