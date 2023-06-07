import React, { FC } from 'react';
import { pauseApartmentService } from './pauseApartmentService.models';
import { useEvent, useStore } from 'effector-react';
import { PauseApartmentModal } from './view/PauseApartmentModal';
import { Props } from './pauseApartmentService.types';

const { inputs, outputs, gates } = pauseApartmentService;
const { PauseApartmentGate } = gates;

export const PauseApartmentContainer: FC<Props> = ({ apartmentId }) => {
  const isOpen = useStore(outputs.$isPauseApartmentModalVisible);
  const isLoading = useStore(outputs.$isLoading);
  const problemDevices = useStore(outputs.$problemDevices);

  const pauseApartmentModalCancelButtonClicked = useEvent(
    inputs.pauseApartmentModalCancelButtonClicked,
  );
  const pauseApartment = useEvent(inputs.pauseApartment);

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
