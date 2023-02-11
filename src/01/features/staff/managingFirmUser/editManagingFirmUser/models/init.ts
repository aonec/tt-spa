import { refetchStaff } from './../../../displayStaff/models/index';
import { sample, combine, forward } from 'effector';
import {
  $managingFirmUser,
  fetchManagingFirmUserFx,
} from '../../displayManagingFirmUser/models';
import {
  editManagingUserInfoForm,
  editManagingUserInfoFx,
  EditManagingFirmUserGate,
} from './index';
import { OrganizationUserResponse, OrganizationUserUpdateRequest } from 'myApi';

const prepareFormData = (user: OrganizationUserResponse | null) => ({
  email: user?.email,
  firstName: user?.firstName,
  lastName: user?.lastName,
  middleName: user?.middleName,
  cellphone: user?.cellphone,
  roleTypes: user?.roles?.map((elem) => elem.key),
  firmCompetenceIds: user?.competences?.map((elem) => elem.id),
});

forward({
  from: editManagingUserInfoFx.doneData,
  to: refetchStaff,
});

forward({
  from: EditManagingFirmUserGate.close,
  to: editManagingUserInfoForm.resetValues,
});

sample({
  source: $managingFirmUser.map((user) => prepareFormData(user)),
  clock: EditManagingFirmUserGate.open,
  target: editManagingUserInfoForm.setForm,
});

forward({
  from: fetchManagingFirmUserFx.doneData.map((user) => prepareFormData(user)),
  to: editManagingUserInfoForm.setForm,
});

sample({
  source: combine(
    editManagingUserInfoForm.$values,
    $managingFirmUser.map((user) => user?.id),
    (values: OrganizationUserUpdateRequest, id) => ({ ...values, id }),
  ),
  clock: editManagingUserInfoForm.formValidated,
  target: editManagingUserInfoFx as any,
});
