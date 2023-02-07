import styled from 'styled-components';
import { UploadIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  color: #272f5ab2;

  padding: 16px 24px;
  border-bottom: 1px solid lightgray;
`;

export const DateWrapper = styled.div`
  color: #272f5a;
  font-weight: 500;
`;

export const NameWrapper = styled.div`
  display: block;
  align-items: center;
  margin-left: 8px;

  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UploadIconSC = styled(UploadIcon)`
  cursor: pointer;
`;
