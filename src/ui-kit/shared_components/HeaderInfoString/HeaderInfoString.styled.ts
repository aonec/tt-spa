import styled from 'styled-components';
import { PointIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: #272f5ae5;
  font-weight: 500;
  font-size: 12px;

  &:first-child {
    margin-left: 0;
  }
`;

export const PointIconSC = styled(PointIcon)`
  margin-left: 10px;
`;
