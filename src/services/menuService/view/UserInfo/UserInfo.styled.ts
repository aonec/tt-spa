import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { UserIcon } from '../../../../ui-kit/icons';

export const UserInfoWrapper = styled.div`
  padding: 5px 6px 15px;
  margin: 0 12px;
  border-bottom: 1px solid #dcdee4;
`;

export const UserIconSC = styled(UserIcon)`
  min-width: 10px;
`;

export const UserEmailWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserEmail = styled(NavLink)`
  margin-left: 15px;
  font-weight: bold;
  width: 145px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #272f5a;
  transition: 0.2s;

  &:hover {
    color: #189ee9;
  }
`;

export const UserManagingFirmName = styled.div`
  margin: 5px 0 0 25px;
  font-size: 12px;
  width: 145px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
