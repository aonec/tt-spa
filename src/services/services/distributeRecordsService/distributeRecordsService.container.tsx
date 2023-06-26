import React, { useCallback } from 'react';
import { useUnit } from 'effector-react';
import { intersection } from 'lodash';
import {
  appointmentsCountingQuery,
  districtAppointmentsQuery,
  districtsQuery,
  individualSealControllersQuery,
  setAppointmentsToControllerMutation,
} from './distributeRecordsService.api';
import { distributeRecordsService } from './distributeRecordsService.models';
import { DistributeRecordsPage } from './view/DistributeRecordsPage';
import { AppointmentsByHousingStocks } from './view/DistributeRecordsPage/DistrictsMap/DistrictsMap.types';
import {
  RemoveAssignmentContainer,
  removeAssignmentService,
} from '../removeAssignmentService';

const {
  inputs,
  outputs,
  gates: { DistributeRecordsGate },
} = distributeRecordsService;

export const DistributeRecordsContainer = () => {
  const { data: districtsList, pending: isLoadingDistricts } =
    useUnit(districtsQuery);

  const { data: appointmentsInDistrict, pending: isLoadingAppointments } =
    useUnit(districtAppointmentsQuery);

  const { data: appointmentsCounting } = useUnit(appointmentsCountingQuery);

  const { data: controllers } = useUnit(individualSealControllersQuery);

  const {
    start: setAppointmentsToController,
    pending: isLoadingDistributeAppointments,
  } = useUnit(setAppointmentsToControllerMutation);

  const {
    handleSelectDistrict,
    handleUnselectDistrict,
    handleSetAppointmentDate,
    handleSelectAppointments,
    openDistributeAppointmentsModal,
    closeDistributeAppointmentsModal,
    openCreateControllerModal,
    openRemoveAssignmentModal,
  } = useUnit({
    handleSelectDistrict: inputs.handleSelectDistrict,
    handleUnselectDistrict: inputs.handleUnselectDistrict,
    handleSetAppointmentDate: inputs.setAppointmentDate,
    handleSelectAppointments: inputs.selectAppointments,
    openDistributeAppointmentsModal: inputs.openDistributeAppointmentsModal,
    closeDistributeAppointmentsModal: inputs.closeDistributeAppointmentsModal,
    openCreateControllerModal: inputs.openCreateControllerModal,
    openRemoveAssignmentModal: removeAssignmentService.inputs.openModal,
  });

  const {
    selectedDistrict,
    appointmentDate,
    selectedAppointmentsIds,
    isDistributeAppointmentsModalOpen,
  } = useUnit({
    selectedDistrict: outputs.$selectedDistrict,
    appointmentDate: outputs.$appointmentDate,
    selectedAppointmentsIds: outputs.$selectedAppointmentsIds,
    isDistributeAppointmentsModalOpen:
      outputs.$isDistributeAppointmentsModalOpen,
  });

  const handleSelectHousingStock = useCallback(
    (data: AppointmentsByHousingStocks) => {
      const isHouseSelected = Boolean(
        intersection(
          data.appointments.map((elem) => elem.id),
          selectedAppointmentsIds,
        ).length,
      );

      if (!isHouseSelected) {
        handleSelectAppointments([
          ...selectedAppointmentsIds,
          ...data.appointments.reduce((acc, elem) => {
            if (!elem.controllerId) {
              return [...acc, elem.id];
            }
            return acc;
          }, [] as string[]),
        ]);
      }

      if (isHouseSelected) {
        handleSelectAppointments(
          selectedAppointmentsIds.filter(
            (elem) =>
              !data.appointments
                .map((appointment) => appointment.id)
                .includes(elem),
          ),
        );
      }
    },
    [selectedAppointmentsIds, handleSelectAppointments],
  );

  return (
    <>
      <DistributeRecordsGate />
      <RemoveAssignmentContainer />
      <DistributeRecordsPage
        districtsList={districtsList || []}
        isLoadingDistricts={isLoadingDistricts}
        handleSelectDistrict={handleSelectDistrict}
        handleUnselectDistrict={handleUnselectDistrict}
        selectedDistrict={selectedDistrict}
        appointmentDate={appointmentDate}
        handleSetAppointmentDate={handleSetAppointmentDate}
        appointmentsInDistrict={appointmentsInDistrict}
        isLoadingAppointments={isLoadingAppointments}
        handleSelectHousingStock={handleSelectHousingStock}
        selectedAppointmentsIds={selectedAppointmentsIds}
        handleSelectAppointments={handleSelectAppointments}
        appointmentsCounting={appointmentsCounting}
        openDistributeAppointmentsModal={openDistributeAppointmentsModal}
        closeDistributeAppointmentsModal={closeDistributeAppointmentsModal}
        isDistributeAppointmentsModalOpen={isDistributeAppointmentsModalOpen}
        controllers={controllers}
        openCreateControllerModal={openCreateControllerModal}
        setAppointmentsToController={setAppointmentsToController}
        isLoadingDistributeAppointments={isLoadingDistributeAppointments}
        openRemoveAssignmentModal={openRemoveAssignmentModal}
      />
    </>
  );
};
