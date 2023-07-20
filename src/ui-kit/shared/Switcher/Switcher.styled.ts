import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const SwitcherWrapper = styled.div`
  display: flex;
`;

export const SwitcherText = styled.div`
  cursor: pointer;
  margin-left: 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  color: #272f5a;
`;

export const ChevronLeft = styled(ChevronIcon)`
  margin-right: 10px;
`;

export const ChevronRight = styled(ChevronIcon)`
  margin-left: 10px;
  transform: rotate(180deg);
`;
