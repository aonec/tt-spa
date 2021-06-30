import React from 'react';
import classes from '../Settings.module.scss';
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
import { MenuButtonTT } from '01/tt-components';
import { deleteContractorButtonClicked } from '01/features/contractors/deleteContractor/models';
import { DeleteContractorModal } from '01/features/contractors/deleteContractor';
import { usePhoneMask } from '01/features/staff/addStaff/utils';

const Contractors = () => {
  const contractors = useStore($contractors);
  const isFetchingContractorsFailed = useStore($isFetchingContractorsFailed);
  const loading = useStore(getContractorsFx.pending);
  const mask = usePhoneMask();

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

  const phoneNumber = (cellphone) =>
    cellphone ? mask.maskValue(String(cellphone)) : 'Телефон не указан';

  const contractorsList = contractors?.map((contractor) => {
    const { name, email, cellphone, id } = contractor;
    return (
      <li className={classes.staff} key={id}>
        <div className={classes.name}>{name}</div>
        <div className={classes.phoneNumber}>{phoneNumber(cellphone)}</div>
        <div className={classes.email}>{email}</div>
        <MenuButtonTT
          size={'small'}
          menuButtonArr={[
            {
              title: 'Редактировать информацию о контрагенте',
              cb: () => {},
              show: true,
              color: 'default',
              clickable: true,
            },
            {
              title: 'Удалить контрагента',
              cb: () => deleteContractorButtonClicked({ id, name }),
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
      <DeleteContractorModal />
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
