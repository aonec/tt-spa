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
`;

export const StyledContainerFourItems = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 1.9fr 1.9fr;
  gap: 15px;
`;

export const StyledContainerThreeItems = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  gap: 16px;
`;

export const StyledRangePicker = styled(RangePicker)`
  height: 32px;
  width: 100%;
`;

export const StyledForm = styled(Form)`
  margin-bottom: 10px;
  margin-top: 10px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 2px;
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
`;
