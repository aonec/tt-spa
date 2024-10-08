import { UserIcon } from 'ui-kit/icons';
import styled from 'styled-components';
import { Skeleton } from 'antd';

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

  cursor: pointer;
`;

export const UserEmail = styled.div<{ isActive: boolean }>`
  margin-left: 15px;
  font-weight: bold;
  width: 145px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: 0.2s;

  color: ${({ isActive }) => (isActive ? '#189ee9' : '#272f5a')};

  &:hover {
    color: #189ee9;
  }
`;

export const UserManagingFirmName = styled.div`
  margin: 4px 0 0 24px;
  font-size: 12px;
  width: 145px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserLoader = styled(Skeleton.Input)`
  .ant-skeleton-input {
    margin-left: 16px;
    width: 150px;
    border-radius: 4px;
  }
`;
