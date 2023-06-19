import React from 'react';
import { SealActionSelectProfile } from './view/SealActionSelectProfile';
import { useUnit } from 'effector-react';
import { sealActionSelectService } from './sealActionSelectService.model';

const { gates, outputs } = sealActionSelectService;
const { SealActionSelectGate } = gates;

export const SealActionSelectContainer = () => {
  const nearestTotalAppointments = useUnit(outputs.$nearestTotalAppointments);
  const isNearestTotalAppointmentsLoading = useUnit(
    outputs.$isNearestTotalAppointmentsLoading,
  );

  return (
    <>
      <SealActionSelectGate />
      <SealActionSelectProfile
        isNearestTotalAppointmentsLoading={isNearestTotalAppointmentsLoading}
        nearestTotalAppointments={nearestTotalAppointments}
      />
    </>
  );
};
