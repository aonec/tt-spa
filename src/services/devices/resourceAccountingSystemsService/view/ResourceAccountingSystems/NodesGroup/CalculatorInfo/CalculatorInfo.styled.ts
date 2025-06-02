import { WarningIcon } from 'ui-kit/icons';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s;

  &:hover {
    div {
      color: #189ee9 !important;
    }
  }
`;

export const CalculatorModel = styled.div`
  margin-left: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #272f5a;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 150px;
`;

export const CalculatorSerialNumber = styled.div`
  margin-left: 8px;
  font-weight: 400;
  font-size: 14px;
  color: rgba(39, 47, 90, 0.7);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const WarningIconSC = styled(WarningIcon)`
  margin-left: 10px;
`;
