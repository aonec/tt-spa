import { Tree } from 'antd';
import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 352px;
  min-height: 64px;
  padding: 16px;

  position: absolute;
  transition: 0.2s;
  top: 16px;
  left: 16px;
  z-index: 1;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
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
