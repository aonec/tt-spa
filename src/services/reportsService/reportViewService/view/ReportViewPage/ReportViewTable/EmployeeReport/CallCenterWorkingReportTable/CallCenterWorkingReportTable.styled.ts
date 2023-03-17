import styled, { css } from 'styled-components';

export const ResourceReadingsCountHeader = styled.div`
  padding: 12px 0;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ResourceReadingsCountHeaderFact = styled.div`
  padding: 12px 0;
  height: 80px;
  display: flex;
  align-items: flex-end;
`;

export const getBorderedColumnCSS = () => css`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;
