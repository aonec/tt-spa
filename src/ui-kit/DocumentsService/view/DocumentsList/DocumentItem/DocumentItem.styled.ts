import { Skeleton } from 'antd';
import styled from 'styled-components';
import { DocumentIcon, DownloadIcon, TrashIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  padding: 18px;
  display: grid;
  grid-template-columns: 1fr 0.3fr 0.1fr;
  align-items: center;
  border-bottom: 1px solid #d7d9e4;
  color: #272f5a;

  &:last-child {
    border-bottom: none;
  }
`;

export const DocumentNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DocumentIconSC = styled(DocumentIcon)`
  transform: scale(1.2);
`;

export const DocumentName = styled.div`
  margin-left: 12px;
  font-weight: 500;
  font-size: 16px;
`;

export const DocumentDateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DocumentDate = styled.div`
  margin-left: 8px;
  font-size: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

export const ManageButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const TrashIconSC = styled(TrashIcon)`
  cursor: pointer;
  margin-left: 15px;
`;

export const DownloadIconSC = styled(DownloadIcon)`
  cursor: pointer;
`;
