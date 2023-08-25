import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const Wrapper = styled.div`
  width: 480px;
`;

export const ResourceTypeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 6px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  padding-bottom: 16px;
  width: 100%;
`;

export const TextWrapper = styled.div`
  color: #272f5ab2;
  font-weight: 500;
  margin-left: 16px;
`;

export const ButtonSC = styled(Button)`
  padding: 0 40px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
`;
