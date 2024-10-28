import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 880px;
`;

export const Info = styled.div`
  font-weight: 300;
`;

export const Blue = styled.div`
  color: rgba(24, 158, 233, 1);
  font-weight: 500;
`;

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const RightBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PanelTitle = styled.div`
  font-weight: 500;
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

export const Panel = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(39, 47, 90, 0.04);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`;
