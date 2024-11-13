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
  min-width: 100px;
  display: flex;
  gap: 8px;
  font-weight: 600;
  font-size: 30px;
`;

export const Dictrict = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const Percentage = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: rgba(252, 82, 91, 1);
  font-weight: 500;
`;

export const StatisticsWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 6px;
  min-height: 200px;
`;

export const Resource = styled.div`
  border: 1px solid rgba(220, 222, 228, 1);
`;

export const More = styled.div`
  color: grey;
  font-weight: 500;
  margin-top: 26px;
  cursor: no-drop;
`;
