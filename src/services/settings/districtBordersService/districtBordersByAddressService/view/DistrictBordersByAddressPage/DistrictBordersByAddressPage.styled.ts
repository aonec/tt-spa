import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const Wrapper = styled.div`
  margin-top: 12px;
  margin: 0 30px;
`;

export const GoBackWrapper = styled.div`
  width: 70px;
`;

export const AddressSortWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr;
  grid-gap: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;

export const FooterWrapper = styled.div`
  position: relative;
  height: 80px;
`;

export const Panel = styled.div`
  position: fixed;
  bottom: 0px;
  height: 80px;
  left: 208px;
  width: calc(100% - 208px);
  background-color: #ffffff;
  box-shadow: 0px -4px 8px rgba(78, 93, 146, 0.16);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

export const LinkWrapper = styled.div<{ disabled: boolean }>`
  margin-left: 8px;
  color: #189ee9;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const ButtonSC = styled(Button)`
  width: 200px;
`;
