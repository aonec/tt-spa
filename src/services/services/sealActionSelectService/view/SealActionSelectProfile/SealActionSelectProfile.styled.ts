import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronIcon, UserIcon } from 'ui-kit/icons';
import { Skeleton } from 'antd';

export const Wrapper = styled.div`
  margin-top: 32px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LinkBlock = styled(Link)`
  width: 100%;
  height: 72px;
  background: white;
  border: 1px solid #dcdee4;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  border-radius: 4px;
  padding: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 6px 6px rgba(78, 93, 146, 0.16),
      0px 8px 16px rgba(78, 33, 146, 0.1);
  }
`;

export const TitleWrapper = styled.span`
  color: #272f5a;
  font-weight: 500;
`;

export const TextWrapper = styled.span`
  color: #272f5ab2;
`;

export const GroupWrrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ChevronIconSC = styled(ChevronIcon)`
  transform: rotate(180deg);
`;

export const UserIconSC = styled(UserIcon)`
  height: 24px;
  width: 24px;
`;

export const AppointmentsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SkeletonInputSC = styled(Skeleton.Input)`
  width: 144px;
  height: 24px !important;

  border-radius: 4px;
`;
