import { createEffect, createEvent, createStore } from 'effector';
import { forward } from 'effector';
import { EffectFailDataAxiosError } from 'types';
import { closeDevice } from './closeHousingMeteringDeviceService.api';
import { CloseDeviceRequest } from 'api/types';
import { message } from 'antd';

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const handleOnSubmit = createEvent<CloseDeviceRequest>();

const closeHousingMeteringDeviceFx = createEffect<
  CloseDeviceRequest,
  void,
  EffectFailDataAxiosError
>(closeDevice);

closeHousingMeteringDeviceFx.doneData.watch(() => {
  message.success('Прибор успешно закрыт!');
  handleCloseModal();
});

closeHousingMeteringDeviceFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

const onSuccessClose = closeHousingMeteringDeviceFx.doneData;

forward({
  from: handleOnSubmit,
  to: closeHousingMeteringDeviceFx,
});

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

export const closeHousingMeteringDeviceService = {
  inputs: { handleOpenModal, handleCloseModal, handleOnSubmit, onSuccessClose },
  outputs: { $isModalOpen },
};
