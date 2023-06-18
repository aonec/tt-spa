import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  districtAppointmentsQuery,
  districtsQuery,
} from './distributeRecordsService.api';
import moment from 'moment';
import { GetDistrictAppointmentsRequestPayload } from './distributeRecordsService.types';

const domain = createDomain('distributeRecords');

const DistributeRecordsGate = createGate();

const handleUnselectDistrict = domain.createEvent();
const handleSelectDistrict = domain.createEvent<string>();
const $selectedDistrict = domain
  .createStore<string | null>(null)
  .on(handleSelectDistrict, (_, id) => id)
  .reset(DistributeRecordsGate.close, handleUnselectDistrict);

const setAppointmentDate = domain.createEvent<string>();
const $appointmentDate = domain
  .createStore<string>(moment().format('YYYY-MM-DD'))
  .on(setAppointmentDate, (_, date) => date)
  .reset();

const selectAppointments = domain.createEvent<string[]>();
const $selectedAppointmentsIds = domain
  .createStore<string[]>([])
  .on(selectAppointments, (_, ids) => ids)
  .reset(districtAppointmentsQuery.$data);

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
  from: DistributeRecordsGate.open,
  to: districtsQuery.start,
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
  },
  outputs: { $selectedDistrict, $appointmentDate, $selectedAppointmentsIds },
  gates: { DistributeRecordsGate },
};
