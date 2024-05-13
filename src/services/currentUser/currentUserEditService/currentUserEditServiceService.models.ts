import { createEffect, createEvent, sample } from 'effector';
import { editUser } from './currentUserEditServiceService.api';
import { EditPayloud } from './currentUserEditServiceService.types';
import { OrganizationUserResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';

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

export const currentUserEditServiceService = {
  inputs: { handleEdit, handleUpdateUser },
  outputs: { isLoading },
};
