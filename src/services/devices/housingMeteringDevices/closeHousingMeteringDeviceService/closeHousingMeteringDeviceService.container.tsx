import React, { FC, useEffect } from 'react';
import { CloseHousingMeteringDeviceModal } from './view/CloseHousingMeteringDeviceModal';
import { CloseHousingMeteringDeviceServiceContainerProps } from './closeHousingMeteringDeviceService.types';
import { closeHousingMeteringDeviceService } from './closeHousingMeteringDeviceService.model';
import { useEvent, useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';

const { inputs, outputs } = closeHousingMeteringDeviceService;

export const CloseHousingMeteringDeviceContainer: FC<
  CloseHousingMeteringDeviceServiceContainerProps
> = ({ housingMeteringDevice }) => {
  const history = useNavigate();

  useEffect(() => {
    return inputs.onSuccessClose.watch(() => history(-1)).unsubscribe;
  }, [history]);

  const isModalOpen = useStore(outputs.$isModalOpen);

  const handleModalClose = useEvent(inputs.handleCloseModal);

  const handleOnSubmit = useEvent(inputs.handleOnSubmit);
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
