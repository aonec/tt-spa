import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const CalculatorTitle = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr 0.7fr 0.2fr 0.1fr;
  align-items: center;
  justify-content: center;
  height: 60px;
`;

export const SerialNumber = styled.span`
  margin-left: 6px;
  font-weight: normal;
  color: rgba(39, 47, 90, 0.6);
`;

export const DeviceLink = styled(NavLink)`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 2;
  color: #272f5a;
  margin-right: 8px;
`;

export const CalculatorModelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CalculatorWithStatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CalculatorIconWrapper = styled.div`
  margin-right: 9px;
  display: flex;
  align-items: center;
`;

export const NoCalculatorText = styled(CalculatorTitle)`
  display: grid;
  align-items: center;
  grid-template-columns: 6fr 0.44fr 0.2fr 0.1fr;
  font-weight: 500;
  font-size: 16px;
  color: #272f5a;
`;

export const ChevronWrapper = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  &:hover {
    background: #f1f1f1;
  }
`;

export const ChevronSC = styled(ChevronIcon)<{ isOpen: boolean }>`
  transition: 0.2s;
  transform: rotate(${({ isOpen }) => (isOpen ? '90' : '-90')}deg);
`;

export const NodeScore = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 14px;
  font-weight: 400;
  color: rgba(39, 47, 90, 0.7);
`;

export const DevicesWrapper = styled.div`
  border-top: 1px solid var(--frame);
  padding-top: 10px;
`;
