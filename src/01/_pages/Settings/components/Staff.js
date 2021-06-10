import React from 'react';
import { Link } from 'react-router-dom';
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

const Staff = () => {
  const users = useStore($staffList);

  const pending = useStore(fetchStaffFx.pending);

  const phoneMask = usePhoneMask();

  const res = users?.map((item, index) => {
    const { id, email, name, cellphone, executingTaskCount } = item;

    return (
      <li className={classes.staff} key={index}>
        <div className={classes.name}>{name}</div>
        <div className={classes.cellphone}>
          {cellphone ? phoneMask.maskValue(cellphone) : 'Телефон не указан'}
        </div>
        <div className={classes.status}>Работает</div>
        <div className={classes.button}>
          <Link to={`/user/staff/${id}`}>{/*<EditButtonTT />*/}</Link>
        </div>
      </li>
    );
  });

  return (
    <div>
      <StaffGate />
      <AddStaffModal />
      {pending ? <Loader show={true} /> : <ul>{res}</ul>}
    </div>
  );
};

export default Staff;
