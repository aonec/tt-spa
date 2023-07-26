import { createDomain, merge, sample, split } from 'effector';
import {
  ApartmentResponse,
  AppointmentCreateRequest,
  AppointmentResponse,
  AppointmentUpdateRequest,
} from 'api/types';
import { message } from 'antd';
import {
  fetchCreateSeal,
  fetchEditAppointmentSeal,
} from './createSealService.api';
import { EffectFailDataAxiosError } from 'types';
import {
  OpenCreateSealModalPayload,
  WorkWithAppointmentType,
  WorkWithAppoitnmentPayload,
} from './createSealService.types';

const domain = createDomain('createSealService');

const workWithAppointment = domain.createEvent<WorkWithAppoitnmentPayload>();

const createSealAppointment = domain.createEvent<WorkWithAppoitnmentPayload>();
const createSealAppointmentFx = domain.createEffect<
  AppointmentCreateRequest,
  void,
  EffectFailDataAxiosError
>(fetchCreateSeal);

const editSealAppointment = domain.createEvent<WorkWithAppoitnmentPayload>();
const editSealAppointmentFx = domain.createEffect<
  AppointmentUpdateRequest & { id: string },
  void,
  EffectFailDataAxiosError
>(fetchEditAppointmentSeal);

const openModal = domain.createEvent<OpenCreateSealModalPayload>();
const closeModal = domain.createEvent();
const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(openModal, (_, { apartment }) => apartment)
  .reset(closeModal);

const $appointment = domain
  .createStore<AppointmentResponse | null>(null)
  .on(openModal, (_, { appointment }) => appointment)
  .reset(closeModal);
const $actionType = $appointment.map((appointment) =>
  Boolean(appointment)
    ? WorkWithAppointmentType.edit
    : WorkWithAppointmentType.create,
);

const $isOpen = $apartment.map(Boolean);
const workWithSealSucceed = merge([
  createSealAppointmentFx.doneData,
  editSealAppointmentFx.doneData,
]);

split({
  source: workWithAppointment,
  match: $actionType,
  cases: {
    [WorkWithAppointmentType.create]: createSealAppointment,
    [WorkWithAppointmentType.edit]: editSealAppointment,
  },
});

sample({
  source: $appointment,
  clock: editSealAppointment,
  fn: (appointment, payload) => ({ ...payload, id: appointment.id }),
  filter: Boolean,
  target: editSealAppointmentFx,
});

sample({
  source: $apartment,
  clock: createSealAppointment,
  fn: (apartment, payload) => ({ ...payload, apartmentId: apartment.id }),
  filter: Boolean,
  target: createSealAppointmentFx,
});

createSealAppointmentFx.doneData.watch(() =>
  message.success('Запись на опломбировку успешно создана!'),
);

editSealAppointmentFx.doneData.watch(() =>
  message.success('Запись на опломбировку успешно редактирована!'),
);

createSealAppointmentFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

editSealAppointmentFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

sample({
  clock: workWithSealSucceed,
  target: closeModal,
});

export const createSealService = {
  inputs: {
    openModal,
    closeModal,
    workWithAppointment,
    workWithSealSucceed,
  },
  outputs: {
    $isOpen,
    $apartment,
    $appointment,
    $actionType,
  },
};
