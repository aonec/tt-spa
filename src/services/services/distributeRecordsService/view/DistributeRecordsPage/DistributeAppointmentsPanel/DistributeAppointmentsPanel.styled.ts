import { Tree } from 'antd';
import styled, { keyframes } from 'styled-components';
import { ChevronIcon, TrashIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 352px;
  min-height: 64px;
  max-height: calc(86vh - 64px);
  overflow-y: scroll;
  overflow-x: hidden;

  position: absolute;
  transition: 0.2s;
  top: 16px;
  left: 16px;
  z-index: 1;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
`;

export const LoaderWrapper = styled.div`
  padding: 12px 16px 16px;
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0px;
  z-index: 10;

  background: white;
  padding: 16px 16px 0 16px;
`;

export const ContentWrapper = styled.div`
  animation-duration: 0.2s;
  animation-name: ${slideDown};
  padding: 0px 16px 16px 16px;
`;

export const Footer = styled.div`
  position: sticky;
  bottom: 0px;

  background: #f3f5f6;
  border-radius: 0 0 4px 4px;
  padding: 16px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const TreeSC = styled(Tree)`
  width: 100%;

  .ant-tree-title {
    color: #272f5ae5;
    user-select: none;
  }

  .ant-tree-treenode,
  .ant-tree-node-content-wrapper,
  .ant-tree-title {
    width: 100%;
  }

  .treeRoot {
    padding-top: 8px;
    border-top: 1px solid #dcdee4;

    &:first-child {
      border-top: none;
    }
  }
`;

export const RootWrapperTitle = styled.div`
  font-weight: 500;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CountWrapper = styled.div`
  font-weight: 400;
  color: #272f5a52;
`;

export const ChevronSC = styled(ChevronIcon)<{ expanded: boolean }>`
  transform: rotate(${({ expanded }) => (expanded ? '90' : '-90')}deg);
  transition: 0.2s;
`;

export const SelectAllText = styled.span`
  color: #189ee9;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
`;

export const CancelAllText = styled.span`
  color: #272f5a52;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
`;

export const ListHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  margin-bottom: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f5f6;
`;

export const ControllerWrapper = styled.div`
  padding: 8px 12px 8px 12px;
  border-radius: 4px;
  background-color: #189ee929;
  color: #272f5a;

  display: flex;
  align-items: flex-start;
  gap: 4px;
  margin-top: 16px;
`;

export const ControllerInfoTitle = styled.div`
  user-select: none;
  font-weight: 500;
  color: #189ee9;
`;

export const ControllerInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TrashIconSC = styled(TrashIcon)`
  cursor: pointer;
  width: 12px;
  height: 12px;
`;
