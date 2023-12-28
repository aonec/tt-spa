import React, { FC } from 'react';
import { CheckHousingMeteringDeviceModal } from './view/CheckHousingMeteringDeviceModal';
import { useUnit } from 'effector-react';
import { checkHousingMeteringDeviceService } from './checkHousingMeteringDeviceService.model';
import { CheckHousingMeteringDeviceContainerProps } from './checkHousingMeteringDeviceService.types';

const { inputs, outputs } = checkHousingMeteringDeviceService;

export const CheckHousingMeteringDeviceContainer: FC<
  CheckHousingMeteringDeviceContainerProps
> = ({ housingMeteringDevice }) => {
  const { handleModalClose, handleOnSubmit, isModalOpen } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleModalClose: inputs.handleCloseModal,
    handleOnSubmit: inputs.handleOnSubmit,
  });

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
