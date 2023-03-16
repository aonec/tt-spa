import { css } from 'styled-components';

export const getReadingsCountCSS = (isHeader: boolean) => css`
  background: ${isHeader ? '#E4E6E8' : '#F3F5F6'};
`;
