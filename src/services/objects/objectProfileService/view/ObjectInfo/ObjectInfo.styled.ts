import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  height: 48px;
  min-width: 650px;
  padding-left: 15px;

  color: #272f5ae5;
  font-size: 14px;

  border-bottom: 1px solid var(--frame);
`;
