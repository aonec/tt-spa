/* eslint-disable */

import React from "react";
import classes from "../Settings.module.scss";
import { useStore } from "effector-react";
import { Alert } from "antd";
import { Loader } from "../../../_components/Loader";
import {
  $contractors,
  $isFetchingContractorsFailed,
  ContractorsGate,
  getContractorsFx,
} from "../../../features/contractors/displayContractors/models";
import { CenterContainer } from "../../MetersPage/components/MeterDevices/ApartmentReadings";
import { deleteContractorButtonClicked } from "../../../features/contractors/deleteContractor/models";
import { DeleteContractorModal } from "../../../features/contractors/deleteContractor";
import { MenuButtonTT } from "../../../tt-components";
import { usePhoneMask } from "../../../features/staff/addStaff/utils";

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
    cellphone ? mask.maskValue(String(cellphone)) : "Телефон не указан";

  const contractorsList = contractors?.map((contractor) => {
    const { name, email, cellphone, id } = contractor;
    return (
      <li className={classes.staff} key={id}>
        <div className={classes.name}>{name}</div>
        <div className={classes.phoneNumber}>{phoneNumber(cellphone)}</div>
        <div className={classes.email}>{email}</div>
        <MenuButtonTT
          size={"small"}
          menuButtonArr={[
            {
              title: "Редактировать информацию о контрагенте",
              cb: () => {},
              show: true,
              color: "default",
              clickable: true,
            },
            {
              title: "Удалить контрагента",
              cb: () => deleteContractorButtonClicked({ id, name }),
              show: true,
              color: "red",
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
