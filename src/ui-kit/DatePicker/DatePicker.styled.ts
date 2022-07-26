import { DatePicker as AntDatePicker } from 'antd';
import styled from 'styled-components';
import { DatePickerProps } from 'antd/lib/date-picker';
import { FC } from 'react';

export const DatePicker = styled(AntDatePicker)`
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
