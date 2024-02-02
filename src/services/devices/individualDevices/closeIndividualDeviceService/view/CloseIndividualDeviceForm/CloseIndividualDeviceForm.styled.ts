import styled from 'styled-components';
import { ChevronBoldIcon } from 'ui-kit/icons';

export const GroupWrapper = styled.div`
  display: grid;
  align-items: flex-start;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const AlertWrapper = styled.div`
  margin: 12px 0px;
`;

export const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 32px;
`;

export const HistoryButton = styled.div`
  color: #272f5a;
  font-size: 14px;
  font-weight: 500;
  line-height: 26px;

  display: flex;
  align-items: center;
  gap: 10px;

  transition: 0.2s;
  cursor: pointer;
  user-select: none;
`;

export const AlertTitle = styled.div`
  color: #272f5a;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;

export const ChevronRotated = styled(ChevronBoldIcon)`
  transform: rotate(180deg);
`;
