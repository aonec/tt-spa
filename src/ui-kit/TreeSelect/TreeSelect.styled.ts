import { TreeSelect as TreeSelectAntd } from 'antd';
import styled from 'styled-components';

export const TreeSelect = styled(TreeSelectAntd)`
  height: 48px;

  * {
    font-size: 16px !important;
    line-height: 32px;
    caret-color: rgba(0, 0, 0, 0);
  }

  .ant-select-selector {
    height: 100% !important;
    padding: 8px 14px !important;
    border-radius: 4px !important;
  }

  .ant-select-selection-item {
    background-color: transparent;
    border: none;
  }

  .ant-select-selection-placeholder {
    padding-left: 10px;
  }

  .ant-select-arrow {
    margin-right: 16px;
  }

  .ant-select-selection-item-content {
    transform: translateY(-4px);
  }
`;
