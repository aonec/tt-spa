import styled from 'styled-components';
import { Checkbox, Slider } from 'antd';

export const StyledFormThreeRows = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`;

export const StyledSlider = styled(Slider)`
  width: 95%;
  &.ant-slider.ant-slider-with-marks {
    margin-bottom: 12px !important;
  }
  &.ant-slider-mark-text {
    font-size: 12px !important;
  }
  .ant-slider-mark-text-active {
    color: #272f5ab2;
  }
`;

export const StyledContainerThreeItems = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  gap: 16px;
`;

export const StyledContainerTwoItems = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 3.1fr;
  gap: 16px;
`;

export const SegmentedContainer = styled.div`
  margin-top: 31px;
`;

export const CheckboxSC = styled(Checkbox)`
  display: flex;
  align-items: center;
  color: rgba(39, 47, 90, 1);
  font-weight: 500;
  margin-top: 16px;
  user-select: none;
`;
