import Arrow from '01/_components/Arrow/Arrow';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  border-top: 1px solid var(--frame);
  &:first-child {
    border-top: none;
  }
`;

export const DeviceTitleWrapper = styled.div`
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkSC = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: #272f5a;
`;

export const ChevronWrapper = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;

  margin-left: 16px;
  transform: scale(1.1)
    ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(-90deg)')};
  cursor: pointer;
`;

export const ReadingsHistoryButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

export const ArrowSC = styled(Arrow)`
  path : {
    fill: #272f5ab2;
  }
`;
