import { createDomain, merge, sample, split, combine } from 'effector';
import {
  ApartmentResponse,
  AppointmentCreateRequest,
  AppointmentResponse,
  AppointmentUpdateRequest,
  DistrictResponse,
} from 'api/types';
import { message } from 'antd';
import {
  districtAppoinmtentsOnMonthQuery,
  fetchCreateSeal,
  fetchEditAppointmentSeal,
  getDistrict,
} from './createSealService.api';
import { EffectFailDataAxiosError } from 'types';
import {
  OpenCreateSealModalPayload,
  WorkWithAppointmentType,
  WorkWithAppoitnmentPayload,
} from './createSealService.types';
import { GetDistrictAppointmentsRequestPayload } from '../distributeRecordsService/distributeRecordsService.types';
import dayjs from 'dayjs';

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

const getDistrictFx = domain.createEffect<number, DistrictResponse[]>(
  getDistrict,
);
const $districtId = domain
  .createStore<string | null>(null)
  .on(getDistrictFx.doneData, (_, districts) => districts[0]?.id || null)
  .reset(closeModal);

const setMonth = domain.createEvent();
const $currentMonth = domain
  .createStore<string>(dayjs().startOf('month').format('YYYY-MM-DD'))
  .on(setMonth, (_, month) => month);

sample({
  source: combine($districtId, $currentMonth, (districtId, date) => ({
    districtId,
    date,
  })),
  clock: [$districtId, $currentMonth],
  filter: (data): data is GetDistrictAppointmentsRequestPayload =>
    Boolean(data.districtId && data.date),
  target: districtAppoinmtentsOnMonthQuery.start,
});

sample({
  source: $apartment.map((apartment) => apartment?.housingStock?.id),
  filter: Boolean,
  clock: openModal,
  target: getDistrictFx,
});

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

sample({
  clock: $districtId,
  target: [districtAppoinmtentsOnMonthQuery.reset],
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
    setMonth,
  },
  outputs: {
    $isOpen,
    $apartment,
    $appointment,
    $actionType,
    $districtId,
  },
};
