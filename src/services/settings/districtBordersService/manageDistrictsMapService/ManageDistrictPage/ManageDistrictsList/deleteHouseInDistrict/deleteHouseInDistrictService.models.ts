import { message } from 'antd';
import { deleteHouseInDistrictMutation } from './deleteHouseInDistrictService.api';
import { createEvent, createStore, sample } from 'effector';

const handleDialogShow = createEvent<boolean>();

const $isDialogOpen = createStore<boolean>(false).on(
  handleDialogShow,
  (_, isShow) => isShow,
);

sample({
  clock: deleteHouseInDistrictMutation.finished.success,
  fn: () => false,
  target: handleDialogShow,
});

deleteHouseInDistrictMutation.finished.failure.watch((e) => {
  message.error(
    e.error.response.data.error.Text ||
      e.error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const deleteHouseInDistrictService = {
  inputs: { handleDialogShow },
  outputs: { $isDialogOpen },
};
