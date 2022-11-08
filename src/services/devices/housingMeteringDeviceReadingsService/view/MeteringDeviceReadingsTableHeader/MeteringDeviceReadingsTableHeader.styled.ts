import styled from 'styled-components';

export const Wrapper = styled.div<{ isColdWater: boolean }>`
  display: grid;
  align-items: center;
  align-content: center;
  overflow: hidden;

  padding: 0 16px;
  margin-bottom: 8px;
  height: 48px;

  color: #272f5ae5;

  grid-template-columns: ${({ isColdWater }) =>
    isColdWater ? '2.5fr 5.5fr 4fr' : '2fr 5fr 3fr'};
  background-color: #272f5a0a;
`;
