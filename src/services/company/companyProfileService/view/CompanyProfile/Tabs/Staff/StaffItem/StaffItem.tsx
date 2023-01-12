import React, { FC } from 'react';
import { Cellphone, Name, Role, Wrapper } from './StaffItem.styled';
import { StaffItemProps } from './StaffItem.types';
import { useHistory } from 'react-router-dom';
import { usePhoneMask } from '01/features/staff/addStaff/utils';
import { sortUserRoles } from '../Staff.utils';
import { MenuButtonTT } from '01/tt-components';
import { StaffStatus } from '01/features/staff/displayStaff/models/components/StaffStatus';
import { Tooltip } from 'antd';

export const StaffItem: FC<StaffItemProps> = ({
  staff,
  handleOpenStatusChangeModal,
  handleCatchEmployeeStatusData,
}) => {
  const history = useHistory();
  const phoneMask = usePhoneMask();

  const {
    firstName,
    lastName,
    middleName,
    roles,
    id,
    cellphone,
    status,
  } = staff;

  const sortedRoles = sortUserRoles(roles || []);
  const rolesString = sortedRoles?.map(({ value }) => value).join(', ');
  return (
    <Wrapper key={staff.id}>
      <Name>
        {lastName} {firstName} {middleName}
      </Name>

      <Role>
        <Tooltip title={rolesString}>{sortedRoles[0]?.value}</Tooltip>
      </Role>

      <Cellphone>
        {cellphone ? phoneMask.maskValue(cellphone) : 'Телефон не указан'}
      </Cellphone>
      {status?.type && <StaffStatus status={status?.type} />}
      <MenuButtonTT
        menuButtonArr={[
          {
            title: 'Открыть профиль сотрудника',
            cb: () => history.push(`/userProfile/${id}`),
            show: true,
            color: 'default',
            clickable: true,
          },
          {
            title: 'Изменить статус',
            cb: () => {
              handleOpenStatusChangeModal();
              handleCatchEmployeeStatusData({ id, status });
            },
            show: true,
            color: 'default',
            clickable: true,
          },
          {
            title: 'Редактировать информацию о сотруднике',
            cb: () =>
              history.push(`/companyProfile/editManagingFirmUser/${id}`),
            show: true,
            color: 'default',
            clickable: true,
          },
          {
            title: 'Удалить сотрудника',
            cb: () => {},
            show: true,
            color: 'red',
            clickable: true,
          },
        ]}
      />
    </Wrapper>
  );
};
