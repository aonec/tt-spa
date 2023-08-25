import { TreeSelect } from 'antd';
import styled from 'styled-components';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';

export const BaseInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 16px;
  .ant-select-focused {
    .ant-select-selection-item {
      color: #bfbfbf;
      transition: 0.2s;
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

export const InputSC = styled(Input)`
  color: #272f5ae5;
`;

export const TimeWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 16px;
`;

export const CitySelectWrapper = styled.div<{ showCity: boolean }>`
  display: grid;
  grid-template-columns: ${({ showCity }) => (showCity ? '1fr 1fr ' : '1fr')};
  grid-gap: 16px;
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
`;
