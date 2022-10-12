import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 860px;
`;

export const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 5fr;
  grid-column-gap: 15px;

  background: rgba(39, 47, 90, 0.04);
  padding: 15px 25px;
  border-bottom: 1px solid lightgray;
  color: #272f5ae5;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: left;
`;
