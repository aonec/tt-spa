import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  appointmentsCountingQuery,
  districtAppointmentsQuery,
  districtsQuery,
  individualSealControllersQuery,
  nearestAppointmentsDateQuery,
  setAppointmentsToControllerMutation,
} from './distributeRecordsService.api';
import moment from 'moment';
import {
  GetDistrictAppointmentsRequestPayload,
  GetDistrictsAppointmentsCountingRequestPayload,
} from './distributeRecordsService.types';
import {
  createControllerService,
  createIndividualSealControllerMutation,
} from './createControllerService';
import { message } from 'antd';

const domain = createDomain('distributeRecords');

const DistributeRecordsGate = createGate();

const handleUnselectDistrict = domain.createEvent();
const handleSelectDistrict = domain.createEvent<string>();
const setAppointmentDate = domain.createEvent<string>();
const selectAppointments = domain.createEvent<string[]>();

const openDistributeAppointmentsModal = domain.createEvent();
const closeDistributeAppointmentsModal = domain.createEvent();

const $selectedDistrict = domain
  .createStore<string | null>(null)
  .on(handleSelectDistrict, (_, id) => id)
  .reset(DistributeRecordsGate.close, handleUnselectDistrict);

const $appointmentDate = domain
  .createStore<string | null>(moment().format('YYYY-MM-DD'))
  .on(setAppointmentDate, (_, date) => date)
  .on(nearestAppointmentsDateQuery.$data, (_, res) => res?.date)
  .reset();

const $selectedAppointmentsIds = domain
  .createStore<string[]>([])
  .on(selectAppointments, (_, ids) => ids)
  .reset(districtAppointmentsQuery.$data);

const $isDistributeAppointmentsModalOpen = domain
  .createStore(false)
  .on(openDistributeAppointmentsModal, () => true)
  .on(closeDistributeAppointmentsModal, () => false);

const $getAppointmentsRequestPayload = combine(
  $selectedDistrict,
  $appointmentDate,
  (districtId, date) => ({ districtId, date }),
);

sample({
  source: $getAppointmentsRequestPayload,
  filter: (data): data is GetDistrictAppointmentsRequestPayload =>
    Boolean(data.districtId),
  target: districtAppointmentsQuery.start,
});

forward({
  from: setAppointmentsToControllerMutation.finished.success,
  to: [closeDistributeAppointmentsModal],
});

setAppointmentsToControllerMutation.finished.success.watch(() =>
  message.success('Записи успешно распределены'),
);

sample({
  clock: setAppointmentsToControllerMutation.finished.success,
  source: $getAppointmentsRequestPayload,
  filter: (data): data is GetDistrictAppointmentsRequestPayload =>
    Boolean(data.districtId),
  target: districtAppointmentsQuery.start,
});

const $getDistrictsAppointmnetsCounting = combine(
  districtsQuery.$data,
  $appointmentDate,
  (districts, date) => ({
    districtIds: districts?.map((elem) => elem.id) || [],
    date,
  }),
);

sample({
  source: $getDistrictsAppointmnetsCounting,
  filter: (data): data is GetDistrictsAppointmentsCountingRequestPayload =>
    Boolean(data.date),
  target: appointmentsCountingQuery.start,
});

forward({
  from: DistributeRecordsGate.open,
  to: [
    districtsQuery.start,
    nearestAppointmentsDateQuery.start,
    individualSealControllersQuery.start,
  ],
});

forward({
  from: createIndividualSealControllerMutation.finished.success,
  to: individualSealControllersQuery.start,
});

forward({
  from: [DistributeRecordsGate.close, handleUnselectDistrict],
  to: districtAppointmentsQuery.reset,
});

setAppointmentsToControllerMutation.finished.failure.watch(({ error }) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const distributeRecordsService = {
  inputs: {
    handleSelectDistrict,
    handleUnselectDistrict,
    setAppointmentDate,
    selectAppointments,
    openDistributeAppointmentsModal,
    closeDistributeAppointmentsModal,
    openCreateControllerModal:
      createControllerService.inputs.openCreateControllerModal,
  },
  outputs: {
    $selectedDistrict,
    $appointmentDate,
    $selectedAppointmentsIds,
    $isDistributeAppointmentsModalOpen,
  },
  gates: { DistributeRecordsGate },
};
