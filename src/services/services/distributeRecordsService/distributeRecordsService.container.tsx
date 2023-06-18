import React, { useCallback } from 'react';
import { useUnit } from 'effector-react';
import { DistributeRecordsPage } from './view/DistributeRecordsPage';
import {
  districtAppointmentsQuery,
  districtsQuery,
} from './distributeRecordsService.api';
import { distributeRecordsService } from './distributeRecordsService.models';
import { AppointmentsByHousingStocks } from './view/DistributeRecordsPage/DistrictsMap/DistrictsMap.types';

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

  const handleSelectDistrict = useUnit(inputs.handleSelectDistrict);
  const handleUnselectDistrict = useUnit(inputs.handleUnselectDistrict);
  const handleSetAppointmentDate = useUnit(inputs.setAppointmentDate);
  const handleSelectAppointments = useUnit(inputs.selectAppointments);

  const selectedDistrict = useUnit(outputs.$selectedDistrict);
  const appointmentDate = useUnit(outputs.$appointmentDate);
  const selectedAppointmentsIds = useUnit(outputs.$selectedAppointmentsIds);

  const handleSelectHousingStock = useCallback(
    (data: AppointmentsByHousingStocks) =>
      handleSelectAppointments([
        ...selectedAppointmentsIds,
        ...data.appointments.map((elem) => elem.id),
      ]),
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
      />
    </>
  );
};
