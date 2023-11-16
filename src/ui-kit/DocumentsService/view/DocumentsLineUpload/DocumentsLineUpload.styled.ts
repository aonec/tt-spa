import { Skeleton } from 'antd';
import styled from 'styled-components';
import { CloseBlueIcon, TrashIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  padding-right: 16px;
  display: flex;
  align-items: center;
`;

export const DocumentsListWrapper = styled.div`
  margin-left: 5px;
  height: 48px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const DocumentItemWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const TrashIconSC = styled(TrashIcon)`
  min-width: 15px;
  margin-left: 16px;
  transition: 0.2s;
  cursor: pointer;
  transform: translateY(1px);

  &:hover {
    svg {
      path {
        fill: #ff4545 !important;
      }
    }
  }
`;

export const DocumentsListElement = styled.div`
  margin-left: 7px;
  transition: 0.2s;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    color: #189ee9;
  }
`;

export const DocumentSkeleton = styled(Skeleton.Input)`
  margin-left: 7.5px;
  margin-right: 3px;
  min-width: 70px;
  border-radius: 4px;
`;

export const PhotoWrapper = styled.div`
  margin-left: 16px;
`;

export const CloseBlueIconSC = styled(CloseBlueIcon)`
  margin-bottom: 10px;
`;
