import { putManagingFirmUser } from './../../../../../_api/staff';
import { sample, combine, forward } from 'effector';
import {
  $managingFirmUser,
  fetchManagingFirmUserFx,
} from '../../displayManagingFirmUser/models';
import {
  editManagingUserInfoForm,
  editManagingUserInfoFx,
  isUpdateManagingFirmUserSuccess,
} from './index';
import { ManagingFirmUserUpdateRequest } from 'myApi';

editManagingUserInfoFx.use(putManagingFirmUser);

isUpdateManagingFirmUserSuccess
  .on(editManagingUserInfoFx.doneData, () => true)
  .reset(editManagingUserInfoFx.failData);

sample({
  source: combine(
    editManagingUserInfoForm.$values,
    $managingFirmUser.map((user) => user?.id),
    (values: ManagingFirmUserUpdateRequest, id) => ({ ...values, id })
  ),
  clock: editManagingUserInfoForm.formValidated,
  target: editManagingUserInfoFx as any,
});

forward({
  from: fetchManagingFirmUserFx.doneData.map((user) => ({
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    middleName: user?.middleName,
    cellphone: user?.cellphone,
    userRoleIds: user?.userRoles?.map((elem) => elem.id),
    firmCompetenceIds: user?.competences?.map((elem) => elem.id),
  })),
  to: editManagingUserInfoForm.setForm,
});
