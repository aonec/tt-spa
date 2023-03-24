import { css } from 'styled-components';

export const getNameColumnCSS = (isHeader: boolean) => css`
  font-weight: ${!isHeader && 700};
`;
