import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid #dcdee4;
  border-radius: 4px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const ResourceStatisticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RatioWrapper = styled.div`
  font-weight: 500;
  color: #272f5a;
  font-size: 16px;
`;

export const DangerWrapper = styled.span<{ isPositive: boolean }>`
  font-size: 32px;
  color: ${(props) => (props.isPositive ? '#FC525B' : '#272F5A')};
`;

export const LinkButtonWrapper = styled.div`
  margin-top: auto;
`;
