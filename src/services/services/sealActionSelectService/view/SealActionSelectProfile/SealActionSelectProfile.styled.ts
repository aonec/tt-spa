import styled from 'styled-components';
import { UserIcon } from 'ui-kit/icons';
import { Skeleton } from 'antd';

export const Wrapper = styled.div`
  margin-top: 32px;

  display: flex;
  flex-direction: column;
`;

export const TextWrapper = styled.span`
  color: #272f5ab2;
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
