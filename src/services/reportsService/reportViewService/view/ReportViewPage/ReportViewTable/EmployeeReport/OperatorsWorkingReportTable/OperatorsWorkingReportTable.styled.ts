import styled from 'styled-components';

export const ReadingsSourceWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const getSumColumnCSS = (isHeader: boolean) => `
  background: ${isHeader ? '#E4E6E8' : '#F3F5F6'};
  font-weight: ${!isHeader && 700};
`;
