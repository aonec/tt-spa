import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 10px 10px;
  border-bottom: 1px solid #dcdee4;
`;

export const CurrentHousingStock = styled.div`
  color: #272f5ae5;
`;

export const SwitcherWrapper = styled.div`
  display: flex;
`;

export const HousingStocksSwitcher = styled.div`
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
