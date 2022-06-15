import styled from 'styled-components';

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 3fr 1fr 3fr;
  grid-column-gap: 15px;

  padding: 15px 25px;
  border-bottom: 1px solid lightgray;
`;

export const DateWrapper = styled.span`
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

  max-width: 240px;
  font-weight: 500;
  font-size: 14px;
  margin-left: 8px;
  color: #272f5a;
`;

export const ActNumber = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 130px;
`

export const DocumentType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DocumentTypeText = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 170px;
`;

export const ManageIconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 60px;
  margin-left: 10px;
`;

export const DocumentIconWrapper = styled.div`
  min-width: 10px;
`;

export const DocumentIconSC = styled.div`
  font-size: 16;
  cursor: pointer;
`;

export const NoDocumentText = styled.span`
  opacity: 0.5;
`;
