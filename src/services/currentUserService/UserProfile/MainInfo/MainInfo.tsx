import React, { FC } from 'react';
import { Role, TabTitle, Wrapper } from './MainInfo.styled';
import { Props } from './MainInfo.types';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { getUserFullName } from 'utils/getUserFullName';
import { sortUserRoles } from 'services/company/companyProfileService/view/CompanyProfile/Tabs/Staff/Staff.utils';

export const MainInfo: FC<Props> = ({ currentUser }) => {
  if (!currentUser) return null;

  const fullName = getUserFullName({
    firstname: currentUser.firstName,
    lastname: currentUser.lastName,
    middlename: currentUser.middleName,
  });

  const sortedUserRoles = sortUserRoles(currentUser.roles || []);

  const roles = sortedUserRoles.map((role) => <Role> {role.value} </Role>);

  return (
    <Wrapper>
      <TabTitle>Информация</TabTitle>
      <CommonInfo
        items={[
          {
            key: 'ФИО',
            value: fullName,
          },
          {
            key: 'Отдел',
            value: currentUser.department,
          },
          {
            key: 'Должность',
            value: currentUser.position,
          },
          {
            key: 'Внутренний номер ',
            value: currentUser.number,
          },
          {
            key: 'Email',
            value: currentUser.email,
          },
          {
            key: 'Телефон',
            value: currentUser.cellphone,
          },
          {
            key: 'Роль в системе',
            value: roles,
          },
        ]}
      />
    </Wrapper>
  );
};
