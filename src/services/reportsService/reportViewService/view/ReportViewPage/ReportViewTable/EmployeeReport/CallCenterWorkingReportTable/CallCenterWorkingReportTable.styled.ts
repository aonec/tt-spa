import styled from 'styled-components';

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

export const getBorderedColumnCSS = () => `
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

export const rowStyles = `
  &:last-child {
    background: #f3f5f6;
    border-bottom: none;
  }
`;
