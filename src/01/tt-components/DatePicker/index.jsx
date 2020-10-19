import styled, { css } from 'styled-components';
import { DatePicker } from 'antd';

export const DatePickerTT = styled(DatePicker)`
  width: 100%;
  height: 48px;
  padding: 8px 24px !important;
  {
  input {
   font-size: 16px;
   line-height: 32px;
   color: rgba(39, 47, 90, 0.8);
  }}
  ${({ color }) => (color == 'rgba'
  && css`
     color: rgba(39, 47, 90, 0.6);
      `)
  || (color == 'grey'
    && css`
       color: rgba(39, 47, 90, 0.6);
      `)};
      
`;

export default DatePickerTT;
