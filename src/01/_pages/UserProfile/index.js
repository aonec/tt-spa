import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import ManagingFirmAdministrator from './components/ManagingFirmAdministrator';
import ManagingFirmStaff from './components/ManagingFirmStaff';
import {
  getManagingFirmUsersCurrent,
  getManagingFirmUsers,
} from './apiUserProfile';
import { Loader } from '../../components/Loader';

export const UserProfile = () => {
  const { userId } = useParams();

  const [user, setUser] = useState();
  useEffect(() => {
    getManagingFirmUsers(userId).then((res) => {
      setUser(res);
    });

    // getManagingFirmUsersCurrent().then((res) => {
    //   setUser(res);
    // });
  }, [userId]);

  const UserRoles = [
    {
      value: 1334536,
      label: 'Собственник квартиры',
    },
    {
      value: 1334537,
      label: 'Администратор системы',
    },
    {
      value: 1334533,
      label: 'Администратор УК',
    },
    {
      value: 1334539,
      label: 'Сервис Scada',
    },
    {
      value: 1334538,
      label: 'Сервис ЕРЦ',
    },
    {
      value: 1371329,
      label: 'Фоновый рабочий',
    },
    {
      value: 1334534,
      label: 'Исполнитель УК',
    },
    {
      value: 1334535,
      label: 'Оператор УК',
    },
  ];

  if (!user) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Loader show size="64" />
      </div>
    );
  }
  const { userRoleIds } = user;

  const isTrue = (id) => userRoleIds?.find((item) => item === id);

  const isManagingFirmStaff = isTrue(1334534);
  const isManagingFirmAdministrator = isTrue(1334533);
  const isManagingFirmOperator = isTrue(1334535);

  return (
    <div>
      {isManagingFirmStaff ? <ManagingFirmStaff user={user} /> : null}
      {isManagingFirmOperator ? <ManagingFirmStaff user={user} /> : null}
      {isManagingFirmAdministrator ? (
        <ManagingFirmAdministrator user={user} />
      ) : null}
    </div>
  );
};

export default UserProfile;
