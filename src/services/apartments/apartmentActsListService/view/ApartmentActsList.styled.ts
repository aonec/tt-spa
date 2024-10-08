import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 860px;
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 3fr 1.5fr 3fr 3fr 1fr;
  grid-column-gap: 15px;

  background: rgba(39, 47, 90, 0.04);
  padding: 15px 25px;
  border-bottom: 1px solid lightgray;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

export const AddButton = styled.div`
  margin-top: 24px;
  cursor: pointer;
`;

export const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const ExtendedSearchWrapper = styled.div`
  margin-left: 20px;
`;
