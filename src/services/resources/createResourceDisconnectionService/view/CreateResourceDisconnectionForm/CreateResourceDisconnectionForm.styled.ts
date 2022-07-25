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
  .ant-select-clear {
    transform: translateY(-9px) translateX(-16px);
  }
`;
