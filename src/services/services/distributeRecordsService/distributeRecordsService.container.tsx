import React from 'react';
import { useUnit } from 'effector-react';
import { DistributeRecordsPage } from './view/DistributeRecordsPage';
import {
  districtAppointmentsQuery,
  districtsQuery,
} from './distributeRecordsService.api';
import { distributeRecordsService } from './distributeRecordsService.models';

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

  const selectedDistrict = useUnit(outputs.$selectedDistrict);
  const appointmentDate = useUnit(outputs.$appointmentDate);

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
        handleSelectHousingStock={console.log}
      />
    </>
  );
};
