import { createEffect, createEvent, sample } from 'effector';
import { editUser } from './currentUserEditServiceService.api';
import { EditPayloud } from './currentUserEditServiceService.types';
import { OrganizationUserResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const handleEdit = createEvent<EditPayloud>();

const editUserFx = createEffect<
  EditPayloud,
  OrganizationUserResponse,
  EffectFailDataAxiosError
>(editUser);

sample({
  clock: handleEdit,
  target: editUserFx,
});

const isLoading = editUserFx.pending;

const handleUpdateUser = editUserFx.doneData;

editUserFx.doneData.watch(() => message.success('Успешно'));

editUserFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Ошибка сохранения',
  );
});

export const currentUserEditServiceService = {
  inputs: { handleEdit, handleUpdateUser },
  outputs: { isLoading },
};
