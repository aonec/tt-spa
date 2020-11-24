import React, { useContext } from 'react';
import { Title } from '../../../tt-components';
import { SettingsContext } from "../index";
import classes from "../Settings.module.scss";
import EditButton from "./EditButton";

const Contractors = () => {
  const {contractors} = useContext(SettingsContext)
  const {items} = contractors;
  console.log('contractors', items);

  const contractorsList = items.map((contractor, index)=>{
    const {name, email, phoneNumber} = contractor;
    return (<li className={classes.staff} key={index}>
      <div className={classes.name}>{name}</div>
      <div className={classes.phoneNumber}>{phoneNumber || 'Телефон не указан'}</div>
      <div className={classes.email}>{email}</div>
      <div className={classes.button}><EditButton /></div>

    </li>)
  })

  return (
    <div>
      <ul>{contractorsList}</ul>
    </div>
  );
};

export default Contractors;
