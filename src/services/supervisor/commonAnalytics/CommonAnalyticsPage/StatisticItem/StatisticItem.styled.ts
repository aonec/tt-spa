import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid rgba(220, 222, 228, 1);
  border-radius: 4px;
  color: rgba(39, 47, 90, 0.9);
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const Count = styled.div`
  gap: 8px;
  font-weight: 600;
  font-size: 30px;
  display: flex;
`;

export const Dictrict = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const Percentage = styled.div<{ isPositive: boolean }>`
  width: max-content;
  font-size: 12px;
  font-weight: 500;
  transform: translateY(2px);
  padding: 1px 4px;
  border-radius: 4px;
  background-color: ${({ isPositive }) =>
    !isPositive ? '#17b45b23' : '#fc525a21'};

  color: ${({ isPositive }) => (!isPositive ? '#17B45A' : '#FC525B')};
`;

export const StatisticsWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  margin-top: -36px;
`;

export const Resource = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const More = styled.div`
  color: rgba(24, 158, 233, 1);
  font-weight: 500;
  margin-top: 26px;
`;
