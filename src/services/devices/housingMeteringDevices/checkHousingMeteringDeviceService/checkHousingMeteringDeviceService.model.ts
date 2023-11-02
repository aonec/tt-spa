import { createEffect, createEvent, createStore } from 'effector';
import { forward } from 'effector';
import { postCheckDevice } from './checkHousingMeteringDeviceService.api';
import { CheckDeviceRequest } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const handleOnSubmit = createEvent<CheckDeviceRequest>();

const handleUpdateDevice = createEvent();

const editCheckDateFx = createEffect<
  CheckDeviceRequest,
  void,
  EffectFailDataAxiosError
>(postCheckDevice);

editCheckDateFx.doneData.watch(() => {
  message.success('Поверка успешно обновлена!');
  handleCloseModal();
  handleUpdateDevice();
});

editCheckDateFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

forward({
  from: handleOnSubmit,
  to: editCheckDateFx,
});

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

export const checkHousingMeteringDeviceService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    handleOnSubmit,
    handleUpdateDevice,
  },
  outputs: { $isModalOpen },
};
