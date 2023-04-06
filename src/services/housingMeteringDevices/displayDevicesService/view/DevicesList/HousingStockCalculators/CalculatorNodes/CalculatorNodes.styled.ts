import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const CalculatorTitle = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 3fr 1.5fr 2fr 1fr;
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;
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
