import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 480px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  border-bottom: 2px solid #f3f3f3;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
`;
