import { createEvent, createStore, sample } from 'effector';
import { message } from 'antd';
import { deleteHouseInDistrictMutation } from './deleteHouseInDistrictService.api';
import { DeleteHouseInDistrictRequestPayload } from './deleteHouseInDistrictService.types';

const handleCloseDialog = createEvent();

const handleDelete = createEvent();

const setDeletePayloadData = createEvent<DeleteHouseInDistrictRequestPayload>();

const reset = createEvent();

const $payloadData = createStore<DeleteHouseInDistrictRequestPayload | null>(
  null,
)
  .on(setDeletePayloadData, (_, data) => data)
  .reset(reset);

const $isDialogOpen = $payloadData.map(Boolean);

sample({
  clock: handleDelete,
  source: $payloadData,
  filter: (data): data is DeleteHouseInDistrictRequestPayload => Boolean(data),
  target: deleteHouseInDistrictMutation.start,
});

sample({
  clock: [deleteHouseInDistrictMutation.finished.success, handleCloseDialog],
  target: reset,
});

deleteHouseInDistrictMutation.finished.failure.watch((e) => {
  message.error(
    e.error.response.data.error.Text ||
      e.error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const deleteHouseInDistrictService = {
  inputs: { handleCloseDialog, handleDelete, setDeletePayloadData },
  outputs: { $isDialogOpen },
};
