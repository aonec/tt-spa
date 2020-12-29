import styled from 'styled-components';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export const RangePickerTT = styled(RangePicker)`
 height: 48px;
 width: 100%;
  border-radius: 4px;
 {
 .ant-picker-range {
   height: 100% !important;
   padding: 8px 24px !important;
   span {
     font-size: 16px;
     line-height: 32px;
   }
 }     
`;

export default RangePicker;
