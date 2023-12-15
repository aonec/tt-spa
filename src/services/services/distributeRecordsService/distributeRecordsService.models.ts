import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  appointmentsCountingQuery,
  districtAppointmentsQuery,
  districtsQuery,
  individualSealControllersQuery,
  individualSealTaskDocumentQuery,
  nearestAppointmentsDateQuery,
  setAppointmentsToControllerMutation,
} from './distributeRecordsService.api';
import dayjs from 'api/dayjs';
import {
  DownloadTaskDocumentRequestPayload,
  GetDistrictAppointmentsRequestPayload,
  GetDistrictsAppointmentsCountingRequestPayload,
} from './distributeRecordsService.types';
import {
  createControllerService,
  createIndividualSealControllerMutation,
} from './createControllerService';
import { message } from 'antd';
import { removeAssignmentService } from '../removeAssignmentService';
import { downloadTaskDocument } from './distributeRecordsService.utils';
import { currentOrganizationService } from 'services/currentOrganizationService';

const DistributeRecordsGate = createGate();

const handleUnselectDistrict = createEvent();
const handleSelectDistrict = createEvent<string>();
const setAppointmentDate = createEvent<string>();
const selectAppointments = createEvent<string[]>();

const openDistributeAppointmentsModal = createEvent();
const closeDistributeAppointmentsModal = createEvent();

const $selectedDistrict = createStore<string | null>(null)
  .on(handleSelectDistrict, (_, id) => id)
  .reset(DistributeRecordsGate.close, handleUnselectDistrict);

const $appointmentDate = createStore<string | null>(
  dayjs().format('YYYY-MM-DD'),
)
  .on(setAppointmentDate, (_, date) => date)
  .on(
    nearestAppointmentsDateQuery.$data,
    (_, res) => res?.date && dayjs(res.date).format('YYYY-MM-DD'),
  )
  .reset(DistributeRecordsGate.close);

const $selectedAppointmentsIds = createStore<string[]>([])
  .on(selectAppointments, (_, ids) => ids)
  .reset(districtAppointmentsQuery.$data, DistributeRecordsGate.close);

const $isDistributeAppointmentsModalOpen = createStore(false)
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

sample({
  clock: setAppointmentsToControllerMutation.finished.success,
  target: [closeDistributeAppointmentsModal],
});

sample({
  clock: [
    setAppointmentsToControllerMutation.finished.success,
    removeAssignmentService.inputs.assignmentRemoved,
  ],
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

sample({
  clock: DistributeRecordsGate.open,
  target: [
    districtsQuery.start,
    nearestAppointmentsDateQuery.start,
    individualSealControllersQuery.start,
  ],
});

sample({
  clock: createIndividualSealControllerMutation.finished.success,
  target: individualSealControllersQuery.start,
});

sample({
  clock: [
    DistributeRecordsGate.close,
    handleUnselectDistrict,
    $selectedDistrict,
  ],
  target: districtAppointmentsQuery.reset,
});

setAppointmentsToControllerMutation.finished.failure.watch(({ error }) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

setAppointmentsToControllerMutation.finished.success.watch(() =>
  message.success('Записи успешно распределены!'),
);

sample({
  source: $appointmentDate,
  clock: setAppointmentsToControllerMutation.finished.success,
  filter: (date): date is string => Boolean(date),
  fn: (appointmentDate, { params: { controllerId } }) => ({
    controllerId,
    appointmentDate: appointmentDate!,
  }),
  target: individualSealTaskDocumentQuery.start,
});

const downloadTaskDocumentFx = createEffect<
  DownloadTaskDocumentRequestPayload,
  void
>(downloadTaskDocument);

sample({
  source: combine(
    $appointmentDate,
    individualSealControllersQuery.$data,
    (appointmentDate, controllers) => ({ appointmentDate, controllers }),
  ),
  clock: individualSealTaskDocumentQuery.finished.success,
  fn: (
    { appointmentDate, controllers },
    { result: documentResponse, params: { controllerId } },
  ): DownloadTaskDocumentRequestPayload => {
    const controller = controllers?.find((elem) => elem.id === controllerId);

    return {
      documentResponse,
      appointmentDate: appointmentDate!,
      controller: controller!,
    };
  },
  target: downloadTaskDocumentFx,
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
    $organizationCoordinates:
      currentOrganizationService.outputs.$organizationCoordinates,
  },
  gates: { DistributeRecordsGate },
};
