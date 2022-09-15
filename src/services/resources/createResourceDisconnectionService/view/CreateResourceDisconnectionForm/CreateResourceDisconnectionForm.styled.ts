import { TreeSelect } from 'antd';
import styled from 'styled-components';
import { Select } from 'ui-kit/Select';

export const BaseInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 15px;
  .ant-select-focused {
    .tag-placeholder {
      color: #bfbfbf;
    }
  }
  .ant-select-selection-item {
    color: #272f5ae5;
  }
  .ant-input {
    color: #272f5ae5;
  }
  .ant-picker-input {
    input {
      color: #272f5ae5;
    }
  }
`;

export const ResourceOptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .device-resource-icon {
    svg {
      margin-right: 10px;
    }
  }
`;

export const TimeWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 15px;
`;

export const SelectSC = styled(Select)`
  height: auto !important;
  * {
    line-height: 22px !important;
  }
`;

export const TreeSelectSC = styled(TreeSelect)`
  height: 48px;

  * {
    font-size: 16px !important;
    line-height: 32px;
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
`;

export const TagPlaceholder = styled.div`
  color: #272f5ae5;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  transition: 0.3s;
`;
