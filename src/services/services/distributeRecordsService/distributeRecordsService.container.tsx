import React, { useCallback } from 'react';
import { useUnit } from 'effector-react';
import { DistributeRecordsPage } from './view/DistributeRecordsPage';
import {
  appointmentsCountingQuery,
  districtAppointmentsQuery,
  districtsQuery,
} from './distributeRecordsService.api';
import { distributeRecordsService } from './distributeRecordsService.models';
import { AppointmentsByHousingStocks } from './view/DistributeRecordsPage/DistrictsMap/DistrictsMap.types';
import { intersection } from 'lodash';

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

  const handleSelectDistrict = useUnit(inputs.handleSelectDistrict);
  const handleUnselectDistrict = useUnit(inputs.handleUnselectDistrict);
  const handleSetAppointmentDate = useUnit(inputs.setAppointmentDate);
  const handleSelectAppointments = useUnit(inputs.selectAppointments);
  const openDistributeAppointmentsModal = useUnit(
    inputs.openDistributeAppointmentsModal,
  );
  const closeDistributeAppointmentsModal = useUnit(
    inputs.closeDistributeAppointmentsModal,
  );

  const selectedDistrict = useUnit(outputs.$selectedDistrict);
  const appointmentDate = useUnit(outputs.$appointmentDate);
  const selectedAppointmentsIds = useUnit(outputs.$selectedAppointmentsIds);
  const isDistributeAppointmentsModalOpen = useUnit(
    outputs.$isDistributeAppointmentsModalOpen,
  );

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
          ...data.appointments.map((elem) => elem.id),
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
      />
    </>
  );
};
