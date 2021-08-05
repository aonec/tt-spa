import React from 'react';
import classes from '../Settings.module.scss';
import { AddStaffModal } from '01/features/staff/addStaff';
import {
  $staffList,
  fetchStaffFx,
  StaffGate,
} from '01/features/staff/displayStaff/models';
import { useStore } from 'effector-react';
import { Loader } from '01/_components/Loader';
import { usePhoneMask } from '01/features/staff/addStaff/utils';
import { MenuButtonTT } from '01/tt-components';
import { deleteStaffButtonClicked } from '01/features/staff/deleteStaff/models';
import { DeleteStaffModal } from '01/features/staff/deleteStaff';
import { StaffStatus } from '01/features/staff/displayStaff/models/components/StaffStatus';
import { editStaffStatusButtonClicked } from '01/features/staff/managingFirmUsersStatuses/editStaffStatus/models';
import { EditStaffStatusModal } from '01/features/staff/managingFirmUsersStatuses/editStaffStatus';
import { useHistory } from 'react-router-dom';

const Staff = () => {
  const users = useStore($staffList);
  const pending = useStore(fetchStaffFx.pending);
  const history = useHistory();
  const phoneMask = usePhoneMask();

  const res = users?.map((item, index) => {
    const { id, name, cellphone, status } = item;

    return (
      <li className={classes.staff} key={index}>
        <div className={classes.name}>{name}</div>
        <StaffStatus status={status?.type} />
        <div className={classes.cellphone}>
          {cellphone ? phoneMask.maskValue(cellphone) : 'Телефон не указан'}
        </div>
        <MenuButtonTT
          menuButtonArr={[
            {
              title: 'Открыть профиль сотрудника',
              cb: () => {},
              show: true,
              color: 'default',
              clickable: true,
            },
            {
              title: 'Изменить статус',
              cb: () => editStaffStatusButtonClicked(item),
              show: true,
              color: 'default',
              clickable: true,
            },
            {
              title: 'Редактировать информацию о сотруднике',
              cb: () => history.push(`/settings/editManagingFirmUser/${id}`),
              show: true,
              color: 'default',
              clickable: true,
            },
            {
              title: 'Удалить сотрудника',
              cb: () => deleteStaffButtonClicked(id),
              show: true,
              color: 'red',
              clickable: true,
            },
          ]}
        />
      </li>
    );
  });

  return (
    <div>
      <StaffGate />
      <AddStaffModal />
      <DeleteStaffModal />
      <EditStaffStatusModal />
      {pending ? <Loader show /> : <ul>{res}</ul>}
    </div>
  );
};

export default Staff;
