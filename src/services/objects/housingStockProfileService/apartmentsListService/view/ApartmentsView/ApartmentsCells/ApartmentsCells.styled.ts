import styled from 'styled-components';

export const Wrapper = styled.div`
  min-width: 450px;
`;

export const LegendWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
`;

export const CellsWrapper = styled.div`
  margin-top: 24px;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fill, 66px);
`;
