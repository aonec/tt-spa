import React, { FC } from 'react';
import { CheckHousingMeteringDeviceModal } from './view/CheckHousingMeteringDeviceModal';
import { useEvent, useStore } from 'effector-react';
import { checkHousingMeteringDeviceService } from './checkHousingMeteringDeviceService.model';
import { CheckHousingMeteringDeviceContainerProps } from './checkHousingMeteringDeviceService.types';

const { inputs, outputs } = checkHousingMeteringDeviceService;

export const CheckHousingMeteringDeviceContainer: FC<CheckHousingMeteringDeviceContainerProps> = ({
  housingMeteringDevice,
}) => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const handleModalClose = useEvent(inputs.handleCloseModal);

  const handleOnSubmit = useEvent(inputs.handleOnSubmit)
  return (
    <>
      <CheckHousingMeteringDeviceModal
        isModalOpen={isModalOpen}
        handleModalClose={() => handleModalClose()}
        housingMeteringDevice={housingMeteringDevice}
        handleOnSubmit={handleOnSubmit}
      />
    </>
  );
};
