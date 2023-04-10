import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';

export const CalculatorSelectWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const CreateCalculatorButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  margin-top: 45px;
  transform: translateX(-10px);
`;

export const CalculatorSerialNumber = styled.div`
  color: #272f5a;
  font-weight: 500;
`;

export const CalculatorModel = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

export const ButtonSC = styled(Button)`
  padding: 0 40px;
`;

export const FormItemSC = styled(FormItem)<{ isWide?: boolean }>`
  width: ${({ isWide }) => (isWide ? '100%' : '50%')};
`;
