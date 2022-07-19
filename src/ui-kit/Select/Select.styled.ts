import { Select as AntSelect } from 'antd';
import styled from 'styled-components';

export const Select = styled(AntSelect)`
  height: 48px;

  * {
    font-size: 16px !important;
    line-height: 32px;
  }

  .ant-select-selector {
    height: 100% !important;
    padding: 8px 16px !important;
    border-radius: 4px !important;
  }

  .ant-select-arrow {
    padding: 0 28px !important;
  }

  .ant-select-item {
    margin: 0 !important;
    padding: 0 !important;

    &:hover {
      background: #189ee9 !important;
      color: white;
    }

    .ant-select-item-option-content {
      background: white;
      padding: 8px 24px !important;
      margin: 0 !important;

      &:hover {
        background: #189ee9 !important;
        color: white;
      }
    }
  }
`;
