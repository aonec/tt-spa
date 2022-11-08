import styled from 'styled-components';

export const Wrapper = styled.div<{ isColdWater: boolean }>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ isColdWater }) =>
    isColdWater ? '2.5fr 5.5fr 4fr' : '2fr 5fr 3fr'};

  padding: 8px 16px;
  height: 48px;
`;

export const MonthWrapper = styled.div`
  display: flex;
  align-items: center;

  font-size: 16px;
  font-weight: 500;

  color: #272f5a;
  text-transform: capitalize;
`;
