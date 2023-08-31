import React, { FC } from 'react';
import { pauseApartmentService } from './pauseApartmentService.models';
import { useEvent, useStore } from 'effector-react';
import { PauseApartmentModal } from './view/PauseApartmentModal';
import { Props } from './pauseApartmentService.types';

const { inputs, outputs, gates, forms } = pauseApartmentService;
const { PauseApartmentGate } = gates;

export const PauseApartmentContainer: FC<Props> = ({ apartmentId }) => {
  const isOpen = useStore(outputs.$isPauseApartmentModalVisible);
  const isLoading = useStore(outputs.$isLoading);
  const problemDevices = useStore(outputs.$problemDevices);

  const pauseApartmentModalCancelButtonClicked = useEvent(
    inputs.pauseApartmentModalCancelButtonClicked,
  );

  return (
    <>
      <PauseApartmentGate id={apartmentId} />
      <PauseApartmentModal
        isLoading={isLoading}
        isOpen={isOpen}
        problemDevices={problemDevices}
        pauseApartmentModalCancelButtonClicked={
          pauseApartmentModalCancelButtonClicked
        }
        form={forms.pauseApartmentForm}
        apartmentId={apartmentId}
      />
    </>
  );
};
