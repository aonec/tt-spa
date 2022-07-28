import { TreeSelect } from 'antd';
import styled from 'styled-components';
import { Select } from 'ui-kit/Select';

export const BaseInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
`;

export const ResourceOptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .device-resource-name {
    margin-left: 10px;
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

export const HeatingStationInputSC = styled(Select)`
  .anticon-close-circle {
    transform: translateY(-9px) translateX(-16px);
    background-color: white;
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
`;

export const TagPlaceholder = styled.div`
  color: #272f5ae5;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;
