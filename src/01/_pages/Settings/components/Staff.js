/* eslint-disable */

import React from "react";
import classes from "../Settings.module.scss";
import { useStore } from "effector-react";

import { useHistory } from "react-router-dom";
import { AddStaffModal } from "../../../features/staff/addStaff";
import {
  $staffList,
  fetchStaffFx,
  StaffGate,
} from "../../../features/staff/displayStaff/models";
import { Loader } from "../../../_components/Loader";
import { MenuButtonTT } from "../../../tt-components";
import { EditStaffStatusModal } from "../../../features/staff/managingFirmUsersStatuses/editStaffStatus";
import { editStaffStatusButtonClicked } from "../../../features/staff/managingFirmUsersStatuses/editStaffStatus/models";
import { StaffStatus } from "../../../features/staff/displayStaff/models/components/StaffStatus";
import { DeleteStaffModal } from "../../../features/staff/deleteStaff";
import { deleteStaffButtonClicked } from "../../../features/staff/deleteStaff/models";
import { usePhoneMask } from "../../../features/staff/addStaff/utils";

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
          {cellphone ? phoneMask.maskValue(cellphone) : "Телефон не указан"}
        </div>
        <MenuButtonTT
          menuButtonArr={[
            {
              title: "Открыть профиль сотрудника",
              cb: () => {},
              show: true,
              color: "default",
              clickable: true,
            },
            {
              title: "Изменить статус",
              cb: () => editStaffStatusButtonClicked(item),
              show: true,
              color: "default",
              clickable: true,
            },
            {
              title: "Редактировать информацию о сотруднике",
              cb: () =>
                history.push(`/companyProfile/editManagingFirmUser/${id}`),
              show: true,
              color: "default",
              clickable: true,
            },
            {
              title: "Удалить сотрудника",
              cb: () => deleteStaffButtonClicked(id),
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
      <StaffGate />
      <AddStaffModal />
      <DeleteStaffModal />
      <EditStaffStatusModal />
      {pending ? <Loader show /> : <ul>{res}</ul>}
    </div>
  );
};

export default Staff;
