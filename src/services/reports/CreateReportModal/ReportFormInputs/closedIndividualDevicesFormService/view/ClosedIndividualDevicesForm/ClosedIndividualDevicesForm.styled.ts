import styled from 'styled-components';

export const ExportTypeSelectWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

export const CitySelectWrapper = styled.div<{ showCity: boolean }>`
  display: grid;
  grid-template-columns: ${({ showCity }) => (showCity ? '1fr 1fr ' : '1fr')};
  grid-gap: 15px;
`;
