import React from 'react';
import classes from '../Settings.module.scss';
import { Link } from 'react-router-dom';
import {
  $contractors,
  $isFetchingContractorsFailed,
  ContractorsGate,
  getContractorsFx,
} from '01/features/contractors/displayContractors/models';
import { useStore } from 'effector-react';
import { Alert } from 'antd';
import { Loader } from '01/_components/Loader';
import { CenterContainer } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';

const Contractors = () => {
  const contractors = useStore($contractors);
  const isFetchingContractorsFailed = useStore($isFetchingContractorsFailed);
  const loading = useStore(getContractorsFx.pending);

  const renderFailedFetchingContractsAlert = () =>
    isFetchingContractorsFailed ? (
      <Alert
        message="Ошибка"
        description="Не отобразить список контрагентов. Пожалуйста, обновите страницу или повторите попытку позже."
        type="error"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />
    ) : null;

  const contractorsList = contractors?.map((contractor, index) => {
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
      {renderFailedFetchingContractsAlert()}
      <CenterContainer>
        <ContractorsGate />
      </CenterContainer>
      <Loader show={loading} />
      <ul>{contractorsList}</ul>
    </div>
  );
};

export default Contractors;
