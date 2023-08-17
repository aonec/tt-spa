import styled from 'styled-components';
import { Input } from 'ui-kit/Input';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 960px;
  margin: 10px;
`;

export const WrapperMultiHeader = styled.div`
  margin: 10px 0px;
`;

export const WrapperT3 = styled.div`
  white-space: normal;
`;

export const WrapperCelsius = styled.div`
  color: rgba(39, 47, 90, 0.32);
`;

export const WrapperValue = styled.div`
  padding: 0 0 0 17px;
`;

export const WrapperUnderscore = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0 26px 6px 6px;
  margin-bottom: 6px;
`;

export const WrapperTime = styled.div`
  display: grid;
  width: 260px;
  padding-left: 16px;
  grid-template-columns: 1.55fr 1fr;
`;

export const InputSc = styled(Input)`
  height: 32px;
`;

export const InputScShort = styled(Input)`
  height: 32px;
`;

export const InputsContainer = styled.div`
  display: flex;
  gap: 32px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  height: 60px;
  padding: 0 50px;

  position: fixed;
  bottom: 0px;

  width: calc(100% - 570px);

  background: transparent;
  z-index: 10;
`;
