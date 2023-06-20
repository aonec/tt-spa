import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  appointmentsCountingQuery,
  districtAppointmentsQuery,
  districtsQuery,
  getNearestAppointmentsDate,
} from './distributeRecordsService.api';
import moment from 'moment';
import {
  GetDistrictAppointmentsRequestPayload,
  GetDistrictsAppointmentsCountingRequestPayload,
} from './distributeRecordsService.types';

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
  .on(getNearestAppointmentsDate.$data, (_, res) => res?.date)
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
  to: [districtsQuery.start, getNearestAppointmentsDate.start],
});

forward({
  from: [DistributeRecordsGate.close, handleUnselectDistrict],
  to: districtAppointmentsQuery.reset,
});

export const distributeRecordsService = {
  inputs: {
    handleSelectDistrict,
    handleUnselectDistrict,
    setAppointmentDate,
    selectAppointments,
    openDistributeAppointmentsModal,
    closeDistributeAppointmentsModal,
  },
  outputs: {
    $selectedDistrict,
    $appointmentDate,
    $selectedAppointmentsIds,
    $isDistributeAppointmentsModalOpen,
  },
  gates: { DistributeRecordsGate },
};
