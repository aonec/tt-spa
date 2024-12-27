import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: 100%;
`;

export const Container = styled.div`
  width: 1000px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-left: -10%;
  padding-right: 10%;
  height: 60px;
  min-width: 114%;
  gap: 12px;
  padding-top: 16px;

  position: absolute;
  bottom: 0;
  left: 0;

  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
`;

export const AlertText = styled.div`
  line-height: 24px;
`;

export const BillingPeriod = styled.div`
  margin-bottom: 12px;
`;

export const Title = styled.div`
  font-weight: 300;
  margin-bottom: 6px;
`;

export const Date = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

export const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 32px;

  margin-top: 16px;
  margin-bottom: 32px;
`;
