import React, { useContext } from 'react';
import { EditButtonTT, Title } from '../../../tt-components';
import { SettingsContext } from '../index';
import classes from '../Settings.module.scss';
import { Link } from 'react-router-dom';
import {
  $contractors,
  ContractorsGate,
} from '01/features/contractors/displayContractors/models';
import { useStore } from 'react-redux';

const Contractors = () => {
  const contractors = useStore($contractors);

  const { items } = contractors || {};
  console.log('contractors', items);

  const contractorsList = items?.map((contractor, index) => {
    const { name, email, phoneNumber } = contractor;
    return (
      <li className={classes.staff} key={index}>
        <div className={classes.name}>{name}</div>
        <div className={classes.phoneNumber}>
          {phoneNumber || 'Телефон не указан'}
        </div>
        <div className={classes.email}>{email}</div>
        <div className={classes.button}>
          <Link to={`/user/contractor/${contractor.id}`}>
            {/*<EditButtonTT />*/}
          </Link>
        </div>
      </li>
    );
  });

  return (
    <div>
      <ContractorsGate />
      <ul>{contractorsList}</ul>
    </div>
  );
};

export default Contractors;
