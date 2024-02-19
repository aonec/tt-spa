import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const PageWrapper = styled.div`
  height: 100vh;
  color: #ffffff;
  background: #12193d;
  display: flex;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const InfoText = styled.div`
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonSC = styled(Button)`
  margin: 48px 0px;
`;

export const ErrorText = styled.div`
  font-size: 40px;
`;

export const AdditionalInfoText = styled.div`
  margin-top: 24px;
`;
