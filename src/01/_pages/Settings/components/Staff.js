import React from 'react';
import classes from '../Settings.module.scss'
import EditButton from "./EditButton";

const Staff = (props) => {
  console.log('Common');
  console.log('props', props);
  const { users } = props;
  const { items } = users;

  const userTemplate = {
    id: 1334567,
    email: '0.2@mail.ru',
    name: 'Исполнитель УК А.',
    cellphone: null,
    executingTaskCount: 31,
  };



  const res = items.map((item, index) => {
    const {
      id, email, name, cellphone, executingTaskCount,
    } = item;
    return (
      <li className={classes.staff}>
        <div className={classes.name}>{name}</div>
        <div className={classes.cellphone}>{cellphone || 'Номер не указан'}</div>
        <div className={classes.status}>Работает</div>
        <div className={classes.button}><EditButton /></div>

      </li>
    );
  });

  return (
    <div>
      <ul>{res}</ul>
    </div>
  );
};

export default Staff;
