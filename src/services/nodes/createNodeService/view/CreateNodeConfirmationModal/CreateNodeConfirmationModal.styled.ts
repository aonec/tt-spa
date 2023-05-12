import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const StepWrapper = styled.div`
  margin-top: 32px;

  &:first-child {
    margin-top: 0;
  }
`;

export const StepTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 16px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  height: 96px;
  background-color: var(--bg);
  padding-right: 32px;
`;

const Line = styled.div`
  border-bottom: 1px solid #dcdee4;
  min-height: 46px;
  padding-left: 8px;
  align-items: center;
`;

export const AddressWrapper = styled(Line)`
  display: flex;
  gap: 8px;
`;

export const CalculatorWrapper = styled(Line)`
  display: grid;
  grid-template-columns: 0.75fr 1fr;
`;

export const CalculatorBaseInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CalculatorSerialNumber = styled.div`
  color: #272f5a;
  font-weight: 500;
  font-size: 16px;
`;

export const CalculatorModel = styled.div`
  color: #272f5ab2;
  font-weight: 400;
  font-size: 14px;
`;

export const AddressText = styled.div`
  color: #272f5a;
  font-weight: 500;
  font-size: 14px;
`;

export const CalculatorEntryNumber = styled.div`
  color: #272f5ab2;
  font-weight: 400;
  font-size: 14px;
`;

export const NoCalculatorText = styled.div`
  color: #272f5ab2;
  font-weight: 400;
  font-size: 14px;
`;

export const NodeResourceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ListWrapper = styled.div`
  margin-top: 16px;
`;

export const ButtonSC = styled(Button)`
  padding: 0 40px;
`;
