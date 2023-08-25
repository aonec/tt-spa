import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const Wrapper = styled.div`
  width: 480px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
`;

export const PipeInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #272f5ae5;
`;

export const PipeMagistralWrapper = styled.div`
  display: flex;
  align-items: center;

  font-size: 12px !important;
  color: #272f5ab2;
  margin-left: 8px;
`;

export const ButtonSC = styled(Button)`
  padding: 0 40px;
`;
