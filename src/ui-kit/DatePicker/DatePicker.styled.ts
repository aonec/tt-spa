import { DatePicker } from 'antd';
import styled from 'styled-components';

export const DatePickerSC = styled(DatePicker)`
  height: 48px;
  width: 100%;
  border-radius: 4px;

  * {
    font-size: 16px !important;
    line-height: 32px;
  }

  .ant-picker-range {
    height: 100% !important;
    padding: 8px 24px !important;
  }
`;
