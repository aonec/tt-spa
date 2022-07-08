import { Slider, Form } from 'antd';
import styled from 'styled-components';
import { DatePicker } from 'antd';
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
  grid-template-columns: 4fr 4fr 1.93fr 1.93fr;
  gap: 16px;
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
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderText = styled.h1`
  font-weight: 300;
  margin-bottom: 16;
`;
