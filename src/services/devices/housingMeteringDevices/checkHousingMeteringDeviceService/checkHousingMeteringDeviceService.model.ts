import { createDomain, forward } from 'effector';
import { postCheckDevice } from './checkHousingMeteringDeviceService.api';
import { CheckDeviceRequest } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('checkHousingMeteringDeviceService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const handleOnSubmit = domain.createEvent<CheckDeviceRequest>();

const handleUpdateDevice = domain.createEvent();

const editCheckDateFx = domain.createEffect<
  CheckDeviceRequest,
  void,
  EffectFailDataAxiosError
>(postCheckDevice);

editCheckDateFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

editCheckDateFx.doneData.watch(() => {
  message.success('Поверка успешно обновлена!');
  handleCloseModal();
  handleUpdateDevice();
});

forward({
  from: handleOnSubmit,
  to: editCheckDateFx,
});

const $isModalOpen = domain
  .createStore<boolean>(false)
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
