import { createDomain, forward } from 'effector';
import { EffectFailDataAxiosError } from 'types';
import { closeDevice } from './closeHousingMeteringDeviceService.api';
import { CloseDeviceRequest } from 'myApi';
import { message } from 'antd';

const domain = createDomain('closeHousingMeteringDeviceService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const handleOnSubmit = domain.createEvent<CloseDeviceRequest>();

const closeHousingMeteringDeviceFx = domain.createEffect<
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

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

export const closeHousingMeteringDeviceService = {
  inputs: { handleOpenModal, handleCloseModal, handleOnSubmit, onSuccessClose },
  outputs: { $isModalOpen },
};
