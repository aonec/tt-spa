import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { deleteManagingFirmUser } from './deleteEmployeeService.api';
import { message } from 'antd';
import { OrganizationUserResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const handleCatchEmployeeId = createEvent<number>();

const handleDelete = createEvent();

const deleteEmployeeFx = createEffect<
  number,
  OrganizationUserResponse | null,
  EffectFailDataAxiosError
>(deleteManagingFirmUser);

const successDelete = deleteEmployeeFx.doneData;

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(successDelete);

const $EmployeeId = createStore<number | null>(null).on(
  handleCatchEmployeeId,
  (_, id) => id,
);

handleCatchEmployeeId.watch((id) => console.log(id) )

sample({
  clock: handleDelete,
  source: $EmployeeId,
  filter: (id): id is number => Boolean(id),
  target: deleteEmployeeFx,
});

deleteEmployeeFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

successDelete.watch(() => message.success('Сотрудник удалён!'));

export const deleteEmployeeService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    handleCatchEmployeeId,
    handleDelete,
    successDelete,
  },
  outputs: {
    $isModalOpen,
  },
};
