import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export const FooterWrapper = styled.div`
  width: 100%;
  max-width: 560px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 16px;
`;

export const AlertContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const LinkSC = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  color: #189ee9;
`;

export const OpenCreateCalculatorText = styled.div`
  display: flex;
  align-items: center;
  color: rgb(24, 158, 233);
  height: 48px;
  margin-left: 16px;
  font-weight: 500;
  font-size: 16px;

  cursor: pointer;
`;

export const FormWrapper = styled.div`
  margin-top: 16px;
`;
