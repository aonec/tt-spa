import styled from 'styled-components';

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr 4fr 1.3fr 1.3fr;
  grid-column-gap: 15px;

  padding: 15px 25px;
  border-bottom: 1px solid lightgray;
`;

export const DateWrapper = styled.b`
  color: rgb(39, 47, 90);
  font-weight: 500;
`;

export const DocumentName = styled.div`
  display: flex;
  align-items: center;
`;

export const DocumentNameText = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 370px;
  font-weight: 500;
  font-size: 14px;
  margin-left: 8px;
  color: #272f5a;
`;
