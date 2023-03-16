import styled, { css } from 'styled-components';

export const ReadingsSourceWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const getReadingsCountCSS = (isHeader: boolean) => css`
  background: ${isHeader ? '#E4E6E8' : '#F3F5F6'};
`;
