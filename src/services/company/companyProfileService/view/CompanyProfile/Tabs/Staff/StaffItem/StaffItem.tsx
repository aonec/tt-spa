import React, { FC } from 'react';
import { Cellphone, Name, Role, Wrapper } from './StaffItem.styled';
import { StaffItemProps } from './StaffItem.types';
import { useHistory } from 'react-router-dom';
import { sortUserRoles } from '../Staff.utils';
import { Tooltip } from 'antd';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { usePhoneMask } from 'hooks/usePhoneMask';
import { StaffStatus } from 'ui-kit/shared/StaffStatus/StaffStatus';
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';

export const StaffItem: FC<StaffItemProps> = ({
  staff,
  handleOpenStatusChangeModal,
  handleCatchEmployeeStatusData,
  handleOpenDeleteModal,
  handleCatchEmployeeId,
}) => {
  const history = useHistory();
  const phoneMask = usePhoneMask();

  const { firstName, lastName, middleName, roles, id, cellphone, status } =
    staff;

  const sortedRoles = sortUserRoles(roles || []);
  const rolesString = sortedRoles?.map(({ value }) => value).join(', ');
  return (
    <Wrapper key={staff.id}>
      <Name
        onClick={() => {
          history.push(`/userProfile/${id}`);
        }}
      >
        {lastName} {firstName} {middleName}
      </Name>

      <Role>
        <Tooltip title={rolesString}>{sortedRoles[0]?.value}</Tooltip>
      </Role>

      <Cellphone>
        {cellphone ? phoneMask.maskValue(cellphone) : 'Телефон не указан'}
      </Cellphone>
      {status?.type && <StaffStatus status={status?.type} />}
      <ContextMenuButton
        size="small"
        menuButtons={[
          {
            title: 'Открыть профиль сотрудника',
            onClick: () => history.push(`/userProfile/${id}`),
          },
          {
            title: 'Изменить статус',
            onClick: () => {
              handleOpenStatusChangeModal();
              handleCatchEmployeeStatusData({ id, status });
            },
          },
          {
            title: 'Редактировать информацию о сотруднике',
            onClick: () =>
              history.push(`/companyProfile/editManagingFirmUser/${id}`),
          },
          {
            title: 'Удалить сотрудника',
            onClick: () => {
              handleOpenDeleteModal();
              handleCatchEmployeeId(id);
            },
            color: ContextMenuButtonColor.danger,
          },
        ]}
      />
    </Wrapper>
  );
};
