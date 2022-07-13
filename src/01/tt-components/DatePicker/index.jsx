import styled from 'styled-components';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export const DatePickerTT = styled(DatePicker)`
  height: 48px;
  width: 320px;
  border-radius: 4px;
`;

export const RangePickerSC = styled(RangePicker)`
  height: 100% !important;
  padding: 16px 24px !important;
  font-size: 16px;
`;

export default DatePickerTT;
