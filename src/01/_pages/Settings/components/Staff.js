import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Settings.module.scss';
import { SettingsContext } from '../index';
import { AddStaffModal } from '01/features/staff/addStaff';

const Staff = () => {
  const { users } = useContext(SettingsContext);
  const { items } = users;

  const res = items.map((item, index) => {
    const { id, email, name, cellphone, executingTaskCount } = item;
    return (
      <li className={classes.staff} key={index}>
        <div className={classes.name}>{name}</div>
        <div className={classes.cellphone}>
          {cellphone || 'Телефон не указан'}
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
      <AddStaffModal />
      <ul>{res}</ul>
    </div>
  );
};

export default Staff;
