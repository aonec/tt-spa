import styled from 'styled-components';
import { Select as AntSelect } from 'antd';

export const SelectMultiple = styled(AntSelect).attrs({ mode: 'multiple' })`
  min-height: 48px;

  .ant-select-selection-placeholder {
    padding-top: 8px;
  }

  .ant-select-selection-item {
    min-height: 24px;
    height: auto;
    border: none;
    background: rgba(24, 158, 233, 0.16);
  }

  .ant-select-selection-item-content {
    line-height: initial;
    display: flex;
    align-items: center;
  }

  .ant-select-selection-item-remove {
    transform: translateY(2px);
  }

  .ant-select-selection-item-remove {
    padding-left: 4px;
    padding-bottom: 4px;
  }

  * {
    font-size: 16px !important;
    line-height: 32px;
  }

  .ant-select-selector {
    height: 100% !important;
    min-height: 48px;
    padding: 8px 16px !important;
    border-radius: 4px !important;
    padding: 5px 16px !important;
  }

  .ant-select-arrow {
    padding: 0 28px !important;
  }

  .ant-select-clear {
    padding: 0px 28px !important;
    height: 30%;
    line-height: 10px !important;
    .anticon {
      line-height: 10px !important;
    }
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
