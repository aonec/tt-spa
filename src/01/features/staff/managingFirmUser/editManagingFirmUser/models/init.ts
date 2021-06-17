import { sample, combine } from 'effector';
import { $managingFirmUser } from '../../displayManagingFirmUser/models';
import { editManagingUserInfoForm, editManagingUserInfoFx } from './index';


sample({
  source: combine(
    editManagingUserInfoForm.$values,
    $managingFirmUser.map((user) => user?.id),
    (values, id) => ({ ...values, id })
  ),
  clock: editManagingUserInfoForm.formValidated,
  target: editManagingUserInfoFx,
});
