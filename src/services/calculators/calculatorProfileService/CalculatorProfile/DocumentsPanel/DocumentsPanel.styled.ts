import styled from 'styled-components';
import { DocumentIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 14px 16px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  border-radius: 4px;
  width: 100%;
  min-width: 200px;
`;

export const TitleWrapper = styled.div`
  color: #272f5a;
  font-size: 16px;
  font-weight: 500;
`;

export const MoreDocumentsLink = styled.div`
  display: flex;
  align-items: center;

  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: #189ee9;
  margin-top: 10px;
  cursor: pointer;
`;

export const DocumentIconSC = styled(DocumentIcon)`
  path {
    fill: #189ee9;
  }
  margin-right: 8px;
`;
