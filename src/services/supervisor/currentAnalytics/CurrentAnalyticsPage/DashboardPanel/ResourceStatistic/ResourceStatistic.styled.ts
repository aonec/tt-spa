import { Progress } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AnalyticsDetailWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NotClosedTaskCount = styled.span<{ isPositive?: boolean }>`
  color: ${({ isPositive }) => isPositive && '#f5222d'};
  font-weight: ${({ isPositive }) => isPositive && 700};
`;

export const AverageTime = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: #272f5a;
`;

export const AverageTimeDescription = styled.span`
  font-size: 20px;
`;

export const DiviationTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
`;

export const ProgressSC = styled(Progress)`
  margin: -8px 0 -2px;
`;
