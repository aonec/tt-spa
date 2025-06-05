import styled from 'styled-components';

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 3fr 1.5fr 3fr 3fr 1fr;
  grid-column-gap: 16px;
  align-items: center;

  padding: 16px 24px;
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
  overflow-y: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 130px;
  font-weight: 500;
  font-size: 14px;
  margin-left: 8px;
  color: #272f5a;
`;

export const ActNumber = styled.div``;

export const DocumentType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Comment = styled.div`
  display: flex;
  align-items: center;
  margin-left: 6px;
`;

export const DocumentTypeText = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 170px;
`;

export const ManageIconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 60px;
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
