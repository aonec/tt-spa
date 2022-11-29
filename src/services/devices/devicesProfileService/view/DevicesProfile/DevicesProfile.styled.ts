import { Slider, Form, DatePicker } from 'antd';
import styled from 'styled-components';
const { RangePicker } = DatePicker;

export const Wrapper = styled.div`
  max-width: 960px;
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

export const StyledContainerFourItems = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 1.9fr;
  gap: 15px;
`;

export const StyledContainerThreeItems = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  gap: 16px;
`;

export const StyledRangePicker = styled(RangePicker)<{ isShadow?: boolean }>`
  height: 32px;
  width: 100%;
  box-shadow: ${({ isShadow = true }) =>
    isShadow ? `0 4px 7px #02004b1f` : 'none'};
`;

export const StyledForm = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 2px;
`;

export const StyledFormThreeRows = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 2px;
  align-items: center;
  gap: 5px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderText = styled.h1`
  font-weight: 300;
  margin-bottom: 16;
`;

export const LabelCS = styled.label`
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #272f5ab2 !important;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
`;
