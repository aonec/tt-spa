import React, { FC, useEffect } from 'react';
import { CloseHousingMeteringDeviceModal } from './view/CloseHousingMeteringDeviceModal';
import { CloseHousingMeteringDeviceServiceContainerProps } from './closeHousingMeteringDeviceService.types';
import { closeHousingMeteringDeviceService } from './closeHousingMeteringDeviceService.model';
import { useUnit } from 'effector-react';
import { useHistory } from 'react-router-dom';

const { inputs, outputs } = closeHousingMeteringDeviceService;

export const CloseHousingMeteringDeviceContainer: FC<
  CloseHousingMeteringDeviceServiceContainerProps
> = ({ housingMeteringDevice }) => {
  const navigate = useHistory();

  useEffect(() => {
    return inputs.onSuccessClose.watch(() => navigate.goBack()).unsubscribe;
  }, [navigate]);

  const { handleModalClose, handleOnSubmit, isModalOpen } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleModalClose: inputs.handleCloseModal,
    handleOnSubmit: inputs.handleOnSubmit,
  });

  return (
    <>
      <CloseHousingMeteringDeviceModal
        housingMeteringDevice={housingMeteringDevice}
        isModalOpen={isModalOpen}
        handleModalClose={() => handleModalClose()}
        handleOnSubmit={handleOnSubmit}
      />
    </>
  );
};
