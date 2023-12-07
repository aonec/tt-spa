import React, { FC } from 'react';
import { pauseApartmentService } from './pauseApartmentService.models';
import { useUnit } from 'effector-react';
import { PauseApartmentModal } from './view/PauseApartmentModal';
import { Props } from './pauseApartmentService.types';

const { inputs, outputs, gates } = pauseApartmentService;
const { PauseApartmentGate } = gates;

export const PauseApartmentContainer: FC<Props> = ({ apartmentId }) => {
  const {
    isLoading,
    isOpen,
    pauseApartment,
    pauseApartmentModalCancelButtonClicked,
    problemDevices,
  } = useUnit({
    isOpen: outputs.$isPauseApartmentModalVisible,
    isLoading: outputs.$isLoading,
    problemDevices: outputs.$problemDevices,
    pauseApartmentModalCancelButtonClicked:
      inputs.pauseApartmentModalCancelButtonClicked,
    pauseApartment: inputs.pauseApartment,
  });

  return (
    <>
      <PauseApartmentGate id={apartmentId} />
      <PauseApartmentModal
        isLoading={isLoading}
        isOpen={isOpen}
        problemDevices={problemDevices}
        apartmentId={apartmentId}
        pauseApartmentModalCancelButtonClicked={
          pauseApartmentModalCancelButtonClicked
        }
        pauseApartment={pauseApartment}
      />
    </>
  );
};
