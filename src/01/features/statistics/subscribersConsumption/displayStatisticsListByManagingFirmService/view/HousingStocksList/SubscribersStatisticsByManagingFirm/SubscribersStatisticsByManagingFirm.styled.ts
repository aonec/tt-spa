import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  z-index: 1;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2.5fr 2.5fr 3.5fr;

  align-items: center;
  background-color: #f3f5f6;
`;

export const ColumnNameWrapper = styled.div`
  display: flex;
  align-items: center;

  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
  padding: 16px 24px 16px 16px;
`;
