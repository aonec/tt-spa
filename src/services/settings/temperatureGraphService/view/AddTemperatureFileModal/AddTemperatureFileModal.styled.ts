import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ButtonFloat = styled(Button)`
  min-width: 256px;
`;

export const AlertWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  color: #272f5a;
  font-size: 14px;
  font-weight: 400;
  user-select: none;
`;

export const RightBlock = styled.div`
  color: #189ee9;
  font-size: 12px;
  font-weight: 500;

  user-select: none;
  cursor: pointer;
`;
